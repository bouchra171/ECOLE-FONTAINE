import config from "../../utils/config";

const url = `${config.API_URL}/roles`;

// Récupérer tous les rôles
export const getAllRoles = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Erreur lors de la récupération des rôles');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  // Récupérer un rôle par son ID
  export const getRoleById = async (roleId) => {
    try {
      const response = await fetch(`${url}/${roleId}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`Erreur lors de la récupération du rôle avec l'ID ${roleId}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  // Ajouter un nouveau rôle
  export const addRole = async (roleData) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roleData),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Erreur lors de l\'ajout du rôle');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  // Mettre à jour un rôle existant
  export const updateRole = async (roleId, roleData) => {
    try {
      const response = await fetch(`${url}/${roleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roleData),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`Erreur lors de la mise à jour du rôle avec l'ID ${roleId}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  // Supprimer un rôle existant
  export const deleteRole = async (roleId) => {
    try {
      const response = await fetch(`${url}/${roleId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`Erreur lors de la suppression du rôle avec l'ID ${roleId}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  