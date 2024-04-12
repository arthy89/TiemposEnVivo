import mongoose from "mongoose";

const tripulacionSchema = new mongoose.Schema(
  {
    piloto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competidor",
      required: true,
    },
    navegante: {
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
    },
  },
  {
    timestamps: true,
    collection: "tripulaciones", // especificar el nombre de la coleccion
  }
);

export default mongoose.model("Tripulacion", tripulacionSchema);
