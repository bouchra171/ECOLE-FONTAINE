import React, { useContext } from "react";
import SidebarsPage from "./sidebars/SidebarsPage";
// Importation du contexte AdminContext qui contient probablement des données de l'administrateur 
import { AdminContext } from "../../utils/adminContext";

const AdminLayout = ({ children }) => {
  // Utilisation du contexte pour extraire la variable messageNotification
  const {messageNotification} = useContext(AdminContext)

  return (
    
    <div className="d-flex flex-column">
        {/* Le composant SidebarsPage est rendu ici. Cela pourrait être un menu latéral ou une barre de navigation. */}
        <SidebarsPage />
      <main className="flex-grow-1 mb-4 admin-layout">
        {/* Le contenu principal de la page est rendu ici. 
        "children" est une propriété spéciale dans React qui est utilisée pour afficher 
        ce que vous incluez entre les balises d'ouverture et de fermeture lors de l'invocation d'un composant. */}
        {children}
      </main>
    </div>
  );
};

// Exportation du composant AdminLayout pour être utilisé dans d'autres parties de l'application
export default AdminLayout;
