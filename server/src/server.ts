import express from "express";
import { AppConfig } from "./config/config";
import connectMongo from "./db";
import { graphqlServer } from "./graphql/server";
import { expressMiddleware } from "@apollo/server/express4";
import { CreateContext } from "./libs/CreateContext";

const app = express();
app.use(express.json());

connectMongo()
  .then(async () => {
    const gql = await graphqlServer();
    app.use(
      "/graphql",
      expressMiddleware(gql, {
        context: CreateContext,
      })
    );

    app.listen(AppConfig.PORT, () =>
      console.log(
        `Server is running on http://localhost:${AppConfig.PORT}/graphql`
      )
    );
  })
  .catch((err) => console.log(err));
