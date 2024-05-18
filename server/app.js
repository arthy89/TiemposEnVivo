import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

let io;

export async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
    },
  });

  // Conneccion de Socket.IO
  io.on("connection", (socket) => {
    console.log("Nueva coneccion");

    socket.on("disconnect", () => {
      console.log("Desconectado");
    });
  });

  // API para la subida de archivos
  app.get("/", (req, res) => res.send("Bienvenido a mi API gaa"));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  await new Promise((resolve) =>
    httpServer.listen(
      {
        port: 4000,
      },
      resolve
    )
  );

  console.log(
    `🚀 Server ready on Port 4000 GraphQL at http://localhost:4000/graphql`
  );
}

export { io };
