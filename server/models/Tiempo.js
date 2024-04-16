import mongoose from "mongoose";

const tiempoSchema = new mongoose.Schema(
  {
    especialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Especial",
      required: true,
    },
    tripulacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tripulacion",
      required: true,
    },
    horaSalida: {
      type: Number,
      required: true,
    },
    horaLlegada: {
      type: Number,
      required: true,
    },
    tiempoMarcado: {
      type: Number,
      // REGISTRO DE TIEMPO SOLAMENTE
    },
    penalizacion: {
      type: Number,
    },
    registrador: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tiempo", tiempoSchema);
