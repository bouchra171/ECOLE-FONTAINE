import config from "../../utils/config";

const url = `${config.API_URL}`;; // URL de base de votre API

// Récupérer toutes les catégories
export const getAllCategories = async () => {
  try {
    const response = await fetch(`${url}/category`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Erreur lors de la récupération des catégories');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Récupérer une catégorie par son ID
export const getCategoryById = async (categoryId) => {
  try {
    const response = await fetch(`${url}/category/${categoryId}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Erreur lors de la récupération de la catégorie avec l'ID ${categoryId}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Ajouter une nouvelle catégorie
export const addCategory = async (categoryData) => {
  try {
    const response = await fetch(`${url}/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Erreur lors de l\'ajout de la catégorie');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Mettre à jour une catégorie existante
export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await fetch(`${url}/category/${categoryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Erreur lors de la mise à jour de la catégorie avec l'ID ${categoryId}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Supprimer une catégorie existante
export const deleteCategory = async (categoryId) => {
  try {
    const response = await fetch(`${url}/category/${categoryId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Erreur lors de la suppression de la catégorie avec l'ID ${categoryId}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
