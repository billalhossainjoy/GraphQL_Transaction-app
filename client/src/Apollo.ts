import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_API + "/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});
