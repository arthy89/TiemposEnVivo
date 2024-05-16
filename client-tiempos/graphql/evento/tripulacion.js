import { gql } from "@apollo/client";

export const GET_TRIPS_EVENTO = gql`
  query getTripsEvent($id: ID!) {
    tripulacionesEvent(_id: $id) {
      _id
      piloto {
        _id
        nombre
        apellidos
        fechaDeNac
        tipoDeSangre
      }
      navegante {
        _id
        nombre
        apellidos
        fechaDeNac
        tipoDeSangre
      }
      evento {
        _id
        nombre
      }
      categoria
      autoNum
      autoMarca
      autoModelo
      categoria
      equipoNombre
    }
  }
`;

export const NEW_TRIPULACION = gql`
  mutation (
    $piloto: ID!
    $navegante: ID!
    $eventoId: ID!
    $categoria: String!
    $autoMarca: String!
    $autoModelo: String!
    $autoNum: String!
    $equipoNombre: String
  ) {
    crearTripulacion(
      piloto: $piloto
      navegante: $navegante
      eventoId: $eventoId
      categoria: $categoria
      autoMarca: $autoMarca
      autoModelo: $autoModelo
      autoNum: $autoNum
      equipoNombre: $equipoNombre
    ) {
      _id
      piloto {
        _id
      }
      navegante {
        _id
      }
      evento {
        _id
      }
      categoria
      autoMarca
      autoModelo
      autoNum
      equipoNombre
    }
  }
`;

export const DEL_TRIPULACION = gql`
  mutation ($id: ID!) {
    delTripulacion(_id: $id) {
      _id
    }
  }
`;
