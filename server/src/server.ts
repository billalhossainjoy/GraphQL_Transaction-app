import express from "express";
import { AppConfig } from "./config/config";
import connectMongo from "./db";
import { graphqlServer } from "./graphql/server";
import { expressMiddleware } from "@apollo/server/express4";
import { CreateContext } from "./libs/CreateContext";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
  })
);

app.use(cookieParser());

connectMongo()
  .then(async () => {
    const gql = await graphqlServer();
    app.use(
      "/graphql",
      expressMiddleware(gql, {
        context: CreateContext,
      })
    );

    app.listen(AppConfig.PORT);
  })
  .catch((err) => console.log(err));
