import mongoose from "mongoose";

const rolSchema = new mongoose.Schema(
  {
    rol_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "roles", // especificar el nombre de la coleccion
  }
);

export default mongoose.model("Rol", rolSchema);
