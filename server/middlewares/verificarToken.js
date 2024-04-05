import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export function verificarToken(token) {
  if (!token) throw new Error("Token de Login no existe");
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Token de Login inválido");
  }
}

export const authMiddleware = async (resolve, parent, args, context, info) => {
  const token = context.req.headers.authorization;
  const decodedToken = verificarToken(token);

  // agregar el ID al contexto
  context.req.userId = decodedToken.id;

  const result = await resolve(parent, args, context, info);

  return result;
};
