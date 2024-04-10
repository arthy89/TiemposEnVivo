import Rol from "../models/Rol.js";
import Org from "../models/Org.js";
import Usuario from "../models/Usuario.js";
import Evento from "../models/Evento.js";
import Categoria from "../models/Categoria.js";
import Etapa from "../models/Etapa.js";
import Especial from "../models/Especial.js";

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

      // Eliminar los Especiales asociados a cada Etapa eliminada
      const delEtapa = await Etapa.find({ eventoId: deletedEvento._id });
      for (const especial of delEtapa) {
        await Especial.findOneAndDelete({ etapaId: especial._id });
      }

      await Etapa.deleteMany({ eventoId: deletedEvento._id });

      return deletedEvento;
    },

    uptEvento: async (_, args) => {
      const updatedEvento = await Evento.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!updatedEvento) throw new Error("Evento no encontrado");
      return updatedEvento;
    },

    actEvento: async (_, { _id, estado }) => {
      const eventoActualizado = await Evento.findByIdAndUpdate(
        _id,
        { estado },
        { new: true }
      );
      if (!eventoActualizado) throw new Error("Evento no encontrado");
      return eventoActualizado;
    },

    crearCat: async (_, { nombre, eventoId }) => {
      const cat = new Categoria({
        nombre,
        eventoId,
      });
      const savedCat = await cat.save();
      return savedCat;
    },

    delCat: async (_, { _id }) => {
      const delCat = await Categoria.findByIdAndDelete(_id);
      if (!delCat) throw new Error("Categoria no encontrada");
      return delCat;
    },

    crearEtapa: async (_, { nombre, eventoId }) => {
      const etapa = new Etapa({
        nombre,
        eventoId,
      });
      const savedEtapa = await etapa.save();
      return savedEtapa;
    },

    uptEtapa: async (_, args) => {
      const updatedEtapa = await Etapa.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!updatedEtapa) throw new Error("Etapa no encontrada");
      return updatedEtapa;
    },

    delEtapa: async (_, { _id }) => {
      const delEtapa = await Etapa.findByIdAndDelete(_id);
      if (!delEtapa) throw new Error("Etapa no encontrada");
      await Especial.deleteMany({ etapaId: delEtapa._id });
      return delEtapa;
    },

    crearEspecial: async (_, { nombre, lugar, distancia, etapaId }) => {
      const especial = new Especial({
        nombre,
        lugar,
        distancia,
        etapaId,
      });
      const savedEspecial = await especial.save();
      return savedEspecial;
    },

    uptEspecial: async (_, args) => {
      const updatedEspecial = await Especial.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!updatedEspecial) throw new Error("Especial no encontrado");
      return updatedEspecial;
    },

    delEspecial: async (_, { _id }) => {
      const delEspecial = await Especial.findByIdAndDelete(_id);
      if (!delEspecial) throw new Error("Especial no encontrado");
      return delEspecial;
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
    etapas: async (parent) => await Etapa.find({ eventoId: parent._id }),
  },

  Categoria: {
    evento: async (parent) => await Evento.findById(parent.eventoId),
  },

  Etapa: {
    evento: async (parent) => await Evento.findById(parent.eventoId),
    especiales: async (parent) => await Especial.find({ etapaId: parent._id }),
  },

  Especial: {
    etapa: async (parent) => await Etapa.findById(parent.etapaId),
  },
};
