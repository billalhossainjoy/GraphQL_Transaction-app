import { ApolloServer, BaseContext } from "@apollo/server";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./reolvers";
import { GraphqlContext } from "../libs/CreateContext";

export const graphqlServer = async () => {
  const gqlServer = new ApolloServer<GraphqlContext>({
    typeDefs,
    resolvers,
  });
  await gqlServer.start();
  return gqlServer;
};
