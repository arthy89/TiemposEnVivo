import { gql } from "@apollo/client";

export const NEW_CAT = gql`
  mutation ($nombre: String!, $eventoId: ID!) {
    crearCat(nombre: $nombre, eventoId: $eventoId) {
      _id
      nombre
    }
  }
`;

export const DEL_CAT = gql`
  mutation ($id: ID!) {
    delCat(_id: $id) {
      _id
      nombre
    }
  }
`;
