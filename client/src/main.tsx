import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { apolloClient } from "./Apollo.ts";
import { ApolloProvider } from "@apollo/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
          <App />
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);
