import mongoose from "mongoose";

const orgSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    }, //todo FALTA EL LOGO IMG
    region: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Org", orgSchema);
