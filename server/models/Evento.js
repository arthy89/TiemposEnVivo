import mongoose from "mongoose";

const eventoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Org",
      required: true,
    },
    lugar: {
      type: String,
      required: true,
    },
    fechaHora: {
      type: Date,
      required: true,
    },
    estado: {
      type: Boolean,
      default: false,
    },
    // foto
    resultado: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Evento", eventoSchema);
