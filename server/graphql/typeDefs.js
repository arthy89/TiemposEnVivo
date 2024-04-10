import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    hello: String
    roles: [Rol]
    orgs: [Org]

    # Usuarios
    usuarios: [Usuario]
    usuario(token: String!): Usuario

    # Eventos
    eventos: [Evento]
    evento(_id: ID!): Evento
  }

  # Consultas de mutacion
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

    # EVENTO
    crearEvento(
      nombre: String!
      tipo: String!
      descripcion: String!
      orgId: ID!
      lugar: String!
      fechaHora: String! # estado: Boolean
    ): Evento
    delEvento(_id: ID!): Evento
    uptEvento(
      _id: ID!
      nombre: String!
      tipo: String
      descripcion: String
      lugar: String
      fechaHora: String
    ): Evento
    actEvento(_id: ID!, estado: String!): Evento

    # CATS del EVENTO
    crearCat(nombre: String!, eventoId: ID!): Categoria
    delCat(_id: ID!): Categoria

    # ETAPAS del EVENTO
    crearEtapa(nombre: String!, eventoId: ID!): Etapa
    uptEtapa(_id: ID!, nombre: String!): Etapa
    delEtapa(_id: ID!): Etapa

    #ESPECIALES por ETAPAS del EVENTO
    crearEspecial(
      nombre: String!
      lugar: String!
      distancia: String!
      etapaId: ID!
    ): Especial
    uptEspecial(
      _id: ID!
      nombre: String
      lugar: String
      distancia: String
    ): Especial
    delEspecial(_id: ID!): Especial

    # Competidor
    crearCompetidor(
      nombre: String!
      apellidos: String!
      fechaDeNac: String
      tipoDeSangre: String
    ): Competidor
  }

  # ###############################################
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

  type Evento {
    _id: ID
    nombre: String
    tipo: String
    descripcion: String
    org: Org
    lugar: String
    fechaHora: String
    estado: String
    createdAt: String
    updatedAt: String
    categorias: [Categoria] # para listar las categorias en el Evento
    etapas: [Etapa]
  }

  type Categoria {
    _id: ID
    nombre: String
    evento: Evento
    createdAt: String
    updatedAt: String
  }

  type Etapa {
    _id: ID
    nombre: String
    evento: Evento
    createdAt: String
    updatedAt: String
    especiales: [Especial]
  }

  type Especial {
    _id: ID
    nombre: String
    lugar: String
    distancia: String
    etapa: Etapa
    createdAt: String
    updatedAt: String
  }

  type Competidor {
    _id: ID
    nombre: String
    apellidos: String
    fechaDeNac: String
    tipoDeSangre: String
    createdAt: String
    updatedAt: String
  }
`;
