import Rol from "../models/Rol.js";
import Org from "../models/Org.js";
import Usuario from "../models/Usuario.js";
import Evento from "../models/Evento.js";
import Categoria from "../models/Categoria.js";

import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";
import { verificarToken } from "../middlewares/verificarToken.js";

export const resolvers = {
  Query: {
    roles: async () => await Rol.find(),
    orgs: async () => await Org.find(),

    //? Usuarios
    usuarios: async () => await Usuario.find(),
    usuario: async (_, { token }) => {
      const tokenDecoded = verificarToken(token);
      const usuario = await Usuario.findById(tokenDecoded.id);
      return usuario;
    },

    // * Eventos
    evento: async (_, { _id }) => await Evento.findById(_id),
    eventos: async () => await Evento.find(),
  },

  Mutation: {
    // ROL
    createRol: async (_, { rol_name }) => {
      const rol = new Rol({
        rol_name,
      });
      const savedRol = await rol.save();
      return savedRol;
    },

    // ORG
    createOrg: async (_, { nombre, region }) => {
      const org = new Org({
        nombre,
        region,
      });
      const savedOrg = await org.save();
      return savedOrg;
    },

    //? USUARIOS
    createUsuario: async (
      _,
      { nombre, email, password, rolId, orgId },
      { res }
    ) => {
      // Hash password
      const hashPassword = await bcrypt.hash(password, 10);

      const usuario = new Usuario({
        nombre,
        email: email.toLowerCase(),
        password: hashPassword,
        rolId,
        orgId,
      });

      const token = await createAccessToken({ id: usuario._id }); // guardar el token
      // logica para almacenar el token en alguna parte
      const savedUsuario = await usuario.save();
      return savedUsuario;
    },

    login: async (_, { email, password }) => {
      const usuario = await Usuario.findOne({ email });
      if (!usuario) throw new Error("Usuario no encontrado");

      const passMatch = await bcrypt.compare(password, usuario.password);
      if (!passMatch) throw new Error("Contraseña incorrecta");

      const token = await createAccessToken({ id: usuario._id });

      //! Tiempo de expiracion de la sesion
      const expiresAccessAt = new Date();
      expiresAccessAt.setHours(expiresAccessAt.getHours() + 24);
      usuario.expiresAccessAt = expiresAccessAt;
      usuario.save(); // guardar el nuevo token

      return { usuario, token };
    },
    //? USUARIOS

    //* EVENTOS
    crearEvento: async (
      _,
      { nombre, tipo, descripcion, orgId, lugar, fechaHora }
    ) => {
      const evento = new Evento({
        nombre,
        tipo,
        descripcion,
        orgId,
        lugar,
        fechaHora,
      });
      const savedEvento = await evento.save();
      return savedEvento;
    },

    delEvento: async (_, { _id }) => {
      const deletedEvento = await Evento.findByIdAndDelete(_id);
      if (!deletedEvento) throw new Error("Evento no encontrado");
      await Categoria.deleteMany({ eventoId: deletedEvento._id });
      return deletedEvento;
    },

    uptEvento: async (_, args) => {
      const updatedEvento = await Evento.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!updatedEvento) throw new Error("Evento no encontrado");
      return updatedEvento;
    },

    finEvento: async (_, { _id }) => {
      const eventoFinalizado = await Evento.findByIdAndUpdate(
        _id,
        { estado: true },
        { new: true }
      );
      if (!eventoFinalizado) throw new Error("Evento no encontrado");
      return eventoFinalizado;
    },

    crearCats: async (_, { nombre, eventoId }) => {
      const cat = new Categoria({
        nombre,
        eventoId,
      });
      const savedCat = await cat.save();
      return savedCat;
    },

    //* EVENTOS
  },

  // ! RELACIONES
  Usuario: {
    rol: async (parent) => await Rol.findById(parent.rolId),
    org: async (parent) => await Org.findById(parent.orgId),
  },

  Evento: {
    org: async (parent) => await Org.findById(parent.orgId),
    categorias: async (parent) =>
      await Categoria.find({ eventoId: parent._id }),
  },

  Categoria: {
    evento: async (parent) => await Evento.findById(parent.eventoId),
  },
};
