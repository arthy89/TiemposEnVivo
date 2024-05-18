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

export const GET_ESP_P = gql`
  query getEspPro($id: ID!) {
    especial(_id: $id) {
      _id
      nombre
      distancia
      lugar
      etapa {
        _id
        nombre
        evento {
          _id
          nombre
        }
      }
      tiempos {
        _id
        horaSalida
        horaLlegada
        penalizacion
        registrador
        tripulacion {
          _id
          piloto {
            _id
            nombre
            apellidos
          }
          navegante {
            _id
            nombre
            apellidos
          }
          autoMarca
          autoModelo
          autoNum
          categoria
        }
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
