import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    hello: String
    roles: [Rol]
    orgs: [Org]
    # Usuarios
    usuarios: [Usuario]
    usuario(token: String!): Usuario
  }

  # Consultas
  type Mutation {
    # Roles
    createRol(rol_name: String!): Rol

    # Organizacion
    createOrg(nombre: String!, region: String!): Org

    # Usuarios
    createUsuario(
      nombre: String!
      email: String!
      password: String!
      rolId: ID!
      orgId: ID!
    ): Usuario

    login(email: String!, password: String!): AuthKey
  }

  # Definicion de las Variables
  type Rol {
    _id: ID
    rol_name: String
    createdAt: String
    updatedAt: String
  }

  type Org {
    _id: ID
    nombre: String
    region: String
    createdAt: String
    updatedAt: String
  }

  type Usuario {
    _id: ID
    nombre: String
    email: String
    password: String
    # token: String
    rol: Rol # retornar datos del rol al que pertenece
    org: Org # retornar datos de la organizacion al que pertenece
    expiresAccessAt: String
    createdAt: String
    updatedAt: String
  }

  type AuthKey {
    token: String
    usuario: Usuario
  }
`;
