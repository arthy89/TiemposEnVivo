import mongoose from "mongoose";

const etapaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    eventoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evento",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Etapa", etapaSchema);
