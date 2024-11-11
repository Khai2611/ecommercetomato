import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./components/Profile/style";

const rootElement = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreContextProvider>
        <ChakraProvider value={theme}>
          <App />
        </ChakraProvider>
      </StoreContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
