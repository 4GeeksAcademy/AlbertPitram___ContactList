import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { ContactProvider } from "./store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContactProvider>
        <AppRoutes />
      </ContactProvider>
    </BrowserRouter>
  </React.StrictMode>
);
