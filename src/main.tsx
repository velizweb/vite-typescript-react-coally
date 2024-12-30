import { StrictMode } from "react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AppContextProvider from "./context/AppContext";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>
);
