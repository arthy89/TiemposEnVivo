import mongoose from "mongoose";

const espSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    lugar: {
      type: String,
      required: true,
    },
    distancia: {
      type: String,
      required: true,
    },
    etapaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Etapa",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Especial", espSchema);
