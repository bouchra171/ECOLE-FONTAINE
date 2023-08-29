import React from "react";
import { createRoot } from "react-dom/client"; //pour créer un point d'ancrage avec la fonctionnalité de rendu concurrent.
import App from "./App"; //importer le composant principal de l'application.
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";


import AdminContextProvider from "./utils/adminContext";
import { AuthProvider } from "./utils/authContext";
const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <AdminContextProvider>
        <App />
      </AdminContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
