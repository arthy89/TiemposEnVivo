import { gql } from "@apollo/client";

export const NEW_TIEMPO = gql`
  mutation (
    $especialId: ID!
    $tripulacion: ID!
    $horaSalida: Int!
    $horaLlegada: Int!
    $registrador: String!
    $penalizacion: Int
  ) {
    crearTiempo(
      especialId: $especialId
      tripulacion: $tripulacion
      horaSalida: $horaSalida
      horaLlegada: $horaLlegada
      registrador: $registrador
      penalizacion: $penalizacion
    ) {
      _id
    }
  }
`;

export const DEL_TIEMPO = gql`
  mutation ($id: ID!) {
    delTiempo(_id: $id) {
      _id
    }
  }
`;
