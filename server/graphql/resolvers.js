import Rol from "../models/Rol.js";
import Org from "../models/Org.js";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";
import {
  verificarToken,
  authMiddleware,
} from "../middlewares/verificarToken.js";

export const resolvers = {
  Query: {
    // hello: (_, __, context) => `Hello ${context.name}!`,
    roles: async () => await Rol.find(),
    orgs: async () => await Org.find(),
    // Usuarios
    usuarios: async () => await Usuario.find(),
    usuario: async (_, { email }) => {
      const usuario = await Usuario.findOne({ email });
      // console.log(token);
      return usuario;
    },
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

    // USUARIOS
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
      usuario.save(); // guardar el nuevo token

      return { usuario, token };
    },

    logout: async (_, __, { req }) => {
      return "log out exitoso";
    },
  },

  // ! RELACIONES
  Usuario: {
    rol: async (parent) => await Rol.findById(parent.rolId),
    org: async (parent) => await Org.findById(parent.orgId),
  },
};
