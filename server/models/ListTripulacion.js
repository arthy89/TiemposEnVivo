import mongoose from "mongoose";

const listTriSchema = new mongoose.Schema(
  {
    piloto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competidor",
      required: true,
    },
    copiloto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competidor",
      required: true,
    },
    eventoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evento",
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },
    autoMarca: {
      type: String,
      required: true,
    },
    autoModelo: {
      type: String,
      required: true,
    },
    autoNum: {
      type: String,
      required: true,
    },
    equipoNombre: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "listadetripulaciones", // especificar el nombre de la coleccion
  }
);

export default mongoose.model("ListaDeTripulaciones", listTriSchema);
