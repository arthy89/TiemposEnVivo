import mongoose from "mongoose";

const compSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellidos: {
      type: String,
      required: true,
    },
    // foto
    fechaDeNac: {
      type: Date,
      required: true,
    },
    tipoDeSangre: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Competidor", compSchema);
