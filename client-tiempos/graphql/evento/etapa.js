import { gql } from "@apollo/client";

export const GET_ETAPA = gql`
  query getEtapa($id: ID!) {
    etapa(_id: $id) {
      _id
      evento {
        _id
        nombre
      }
      nombre
      especiales {
        _id
        nombre
        lugar
        distancia
      }
    }
  }
`;

export const NEW_ETAPA = gql`
  mutation ($nombre: String!, $eventoId: ID!) {
    crearEtapa(nombre: $nombre, eventoId: $eventoId) {
      _id
      nombre
    }
  }
`;

export const UPD_ETAPA = gql`
  mutation ($id: ID!, $nombre: String!) {
    uptEtapa(_id: $id, nombre: $nombre) {
      _id
      nombre
    }
  }
`;

export const DEL_ETAPA = gql`
  mutation ($id: ID!) {
    delEtapa(_id: $id) {
      _id
      nombre
    }
  }
`;
