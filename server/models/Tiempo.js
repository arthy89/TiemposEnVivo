import mongoose from "mongoose";

const tiempoSchema = new mongoose.Schema(
  {
    tripulacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ListaDeTripulaciones",
      required: true,
    },
    especialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Especial",
      required: true,
    },
    creador: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tiempo", tiempoSchema);
