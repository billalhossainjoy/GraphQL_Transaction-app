import { gql } from "@apollo/client/core";


export const gqld = gql`
  mutation CreateTransaction {
    createTransaction {
      id
      description
      category
      amount
      location
      paymentType
      userId
    }
  }
`;