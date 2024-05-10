import { gql } from "@apollo/client";

export const GET_ESPECIAL = gql`
  query ($id: ID!) {
    especial(_id: $id) {
      _id
      nombre
      lugar
      distancia
      etapa {
        _id
        nombre
      }
    }
  }
`;

export const NEW_ESPECIAL = gql`
  mutation (
    $nombre: String!
    $lugar: String!
    $distancia: String!
    $etapaId: ID!
  ) {
    crearEspecial(
      nombre: $nombre
      lugar: $lugar
      distancia: $distancia
      etapaId: $etapaId
    ) {
      _id
      nombre
      lugar
      distancia
    }
  }
`;

export const UPT_ESPECIAL = gql`
  mutation ($id: ID!, $nombre: String, $lugar: String, $distancia: String) {
    uptEspecial(
      _id: $id
      nombre: $nombre
      lugar: $lugar
      distancia: $distancia
    ) {
      _id
      nombre
      lugar
      distancia
    }
  }
`;

export const DEL_ESPECIAL = gql`
  mutation ($id: ID!) {
    delEspecial(_id: $id) {
      nombre
    }
  }
`;
