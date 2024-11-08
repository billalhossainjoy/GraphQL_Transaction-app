import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query transactions {
    transactions {
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

export const GET_TRANSACTION = gql`
  query transactions($input: ID!) {
    transaction(transactionId: $input) {
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

export const GET_TRANSCTION_STATISTICS = gql`
  query GetTransactionStatistics {
    categoryStatistics {
      category
		  totalAmount
    }
  }
`;
