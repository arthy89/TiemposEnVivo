import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($token: String!) {
    usuario(token: $token) {
      email
      nombre
      org {
        _id
        nombre
        region
      }
      rol {
        rol_name
      }
    }
  }
`;
