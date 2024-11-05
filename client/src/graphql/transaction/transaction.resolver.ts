import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: createTransactionInput!) {
    createTransaction(input: $input) {
      id
      userId
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;
export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($input: updateTransactionInput!) {
    updateTransaction(input: $input) {
      id
      userId
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;
export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($transactionId: ID!) {
    deleteTransaction(transactionId: $transactionId) {
      id
      userId
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;
