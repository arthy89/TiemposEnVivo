import { io } from "../app.js";
import Rol from "../models/Rol.js";
import Org from "../models/Org.js";
import Usuario from "../models/Usuario.js";
import Evento from "../models/Evento.js";
import Categoria from "../models/Categoria.js";
import Etapa from "../models/Etapa.js";
import Especial from "../models/Especial.js";
import Competidor from "../models/Competidor.js";
import Tripulacion from "../models/Tripulacion.js";
import Tiempo from "../models/Tiempo.js";

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

    // Etapas
    etapa: async (_, { _id }) => await Etapa.findById(_id),

    // Especiales
    especial: async (_, { _id }) => await Especial.findById(_id),

    // Competidores
    competidores: async () => await Competidor.find(),
    competidor: async (_, { _id }) => await Competidor.findById(_id),

    // TODO Tripulaciones
    tripulaciones: async () => await Tripulacion.find(),
    tripulacion: async (_, { _id }) => await Tripulacion.findById(_id),
    tripulacionesEvent: async (_, { _id }) =>
      await Tripulacion.find({ eventoId: _id }),

    // ! TIEMPOS
    tiempos: async () => await Tiempo.find(),
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
      { nombre, tipo, descripcion, orgId, lugar, fecha, hora }
    ) => {
      const evento = new Evento({
        nombre,
        tipo,
        descripcion,
        orgId,
        lugar,
        fecha,
        hora,
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

    // COMPETIDORES
    crearCompetidor: async (
      _,
      { nombre, apellidos, fechaDeNac, tipoDeSangre }
    ) => {
      const competidor = await new Competidor({
        nombre,
        apellidos,
        fechaDeNac,
        tipoDeSangre,
      });
      const savedComp = await competidor.save();
      return savedComp;
    },

    uptCompetidor: async (_, args) => {
      const updatedComp = await Competidor.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!updatedComp) throw new Error("Competidor no encontrado");
      return updatedComp;
    },

    delCompetidor: async (_, { _id }) => {
      const delComp = await Competidor.findByIdAndDelete(_id);
      if (!delComp) throw new Error("Competidor no encontrado");
      return delComp;
    },
    // COMPETIDORES

    //TODO TRIPULACIONES
    crearTripulacion: async (
      _,
      {
        piloto,
        navegante,
        eventoId,
        categoria,
        autoMarca,
        autoModelo,
        autoNum,
        equipoNombre,
      }
    ) => {
      const tripulacion = new Tripulacion({
        piloto,
        navegante,
        eventoId,
        categoria,
        autoMarca,
        autoModelo,
        autoNum,
        equipoNombre,
      });
      const savedTri = await tripulacion.save();
      return savedTri;
    },

    uptTripulacion: async (_, args) => {
      const updatedTrip = await Tripulacion.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!updatedTrip) throw new Error("Tripulación no encontrada");
      return updatedTrip;
    },

    delTripulacion: async (_, { _id }) => {
      const delTrip = await Tripulacion.findByIdAndDelete(_id);
      if (!delTrip) throw new Error("Tripulación no encontrada");
      return delTrip;
    },
    //TODO TRIPULACIONES

    // ! TIEMPOS
    crearTiempo: async (
      _,
      {
        especialId,
        tripulacion,
        horaSalida,
        horaLlegada,
        tiempoMarcado,
        penalizacion,
        registrador,
      }
    ) => {
      const tiempo = new Tiempo({
        especialId,
        tripulacion,
        horaSalida,
        horaLlegada,
        tiempoMarcado,
        penalizacion,
        registrador,
      });
      const savedTiempo = await tiempo.save();

      // ? Emitir el evento de Nuevo Tiempo
      io.emit("nuevoTiempo", savedTiempo);
      // console.log("Emitiendo nuevoTiempo", savedTiempo);

      return savedTiempo;
    },

    delTiempo: async (_, { _id }) => {
      const delTiempo = await Tiempo.findByIdAndDelete(_id);
      if (!delTiempo) throw new Error("Tiempo no encontrado");
      return delTiempo;
    },
    // ! TIEMPOS
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
    tripulaciones: async (parent) =>
      await Tripulacion.find({ eventoId: parent._id }),
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
    tiempos: async (parent) => await Tiempo.find({ especialId: parent._id }),
  },

  Tripulacion: {
    piloto: async (parent) => await Competidor.findById(parent.piloto),
    navegante: async (parent) => await Competidor.findById(parent.navegante),
    evento: async (parent) => await Evento.findById(parent.eventoId),
  },

  Tiempo: {
    especial: async (parent) => Especial.findById(parent.especialId),
    tripulacion: async (parent) => Tripulacion.findById(parent.tripulacion),
  },
};
