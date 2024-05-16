import { gql } from "@apollo/client";

export const GET_COMPETIDORES = gql`
  query getCompetidores {
    competidores {
      _id
      nombre
      apellidos
      fechaDeNac
      tipoDeSangre
    }
  }
`;

export const NEW_COMPETIDOR = gql`
  mutation (
    $nombre: String!
    $apellidos: String!
    $fechaDeNac: String
    $tipoDeSangre: String
  ) {
    crearCompetidor(
      nombre: $nombre
      apellidos: $apellidos
      fechaDeNac: $fechaDeNac
      tipoDeSangre: $tipoDeSangre
    ) {
      _id
      nombre
      apellidos
      fechaDeNac
      tipoDeSangre
    }
  }
`;
