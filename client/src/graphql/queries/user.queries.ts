import { gql } from "@apollo/client/core";

export const GET_AUTH_USER = gql`
  query AuthUser {
    authUser {
      gender
      id
      name
      profilePicture
      username
    }
  }
`;
