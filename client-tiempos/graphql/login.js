import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      usuario {
        nombre
        email
        rol {
          rol_name
        }
        org {
          nombre
          region
        }
        expiresAccessAt
      }
    }
  }
`;
