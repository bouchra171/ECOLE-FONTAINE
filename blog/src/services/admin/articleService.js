import { Toast } from "react-bootstrap";
import config from "../../utils/config";



const url = `${config.API_URL}/articles`; // URL de base de votre API

// Récupérer tous les articles
export const getAllArticles = async () => {
  try {
    const response = await fetch(`${url}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
     console.log('Erreur lors de la récupération des articles');
     Toast.erreur('Erreur lors de la récupération des articles');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// Récupérer tous les articles
export const getArticleWithComments = async (articleId) => {
  try {
    const response = await fetch(`${url}/${articleId}/comments`);
    if (response.ok) {
      const data = await response.json();
      //console.log("comments",data);
      return data;
    } else {
     console.log('Erreur lors de la récupération des articles');
     Toast.erreur('Erreur lors de la récupération des articles');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// Récupérer tous les articles avec les commentaires
export const getAllArticlesWidthComments = async () => {
  try {
    const response = await fetch(`${url}/comments`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
     console.log('Erreur lors de la récupération des articles');
     Toast.erreur('Erreur lors de la récupération des articles');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Récupérer un article par son ID
export const getArticleById = async (articleId) => {
  try {
    const response = await fetch(`${url}/${articleId}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
     console.log(`Erreur lors de la récupération de l'article avec l'ID ${articleId}`);
     Toast.erreur(`Erreur lors de la récupération de l'article avec l'ID ${articleId}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Ajouter un nouvel article
export const addArticle = async (newArticle,setMessageErreur,setMessageNotification) => {
  try {
    const response = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newArticle,),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success === true) {
        setMessageNotification(data.message);
        // Actualiser la page
       // window.location.reload();
      } else {
        setMessageErreur(data.message);
      }
    } else {
     console.log("Erreur lors de l'ajout de l'article");
     Toast.erreur("Erreur lors de l'ajout de l'article");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Mettre à jour un article existant
export const updateArticle = async (articleId, articleData) => {
  try {
    const response = await fetch(`${url}/${articleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
     console.log(`Erreur lors de la mise à jour de l'article avec l'ID ${articleId}`);
     Toast.erreur(`Erreur lors de la mise à jour de l'article avec l'ID ${articleId}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Supprimer un article existant
export const deleteArticle = async (articleId,setMessageNotification) => {
  try {
    const response = await fetch(`${url}/${articleId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success === true) {
        setMessageNotification(data.message);
      } else {
        setMessageNotification(data.message);
      }
    } else {
     console.log(`Erreur lors de la suppression de l'article avec l'ID ${articleId}`);
     Toast.erreur(`Erreur lors de la suppression de l'article avec l'ID ${articleId}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searcheArticle = async (query) => {
  const urle = `${url}/filter/${query}`;

  try {
    const response = await fetch(urle);
    console.log('response:',response)
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Erreur lors de la requête');
    }
  } catch (error) {
    console.error(error);
  }
};
