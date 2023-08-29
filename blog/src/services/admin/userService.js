import config from "../../utils/config";

const url = `${config.API_URL}/users`;
// Fonction pour connecter l'utilisateur
export const login = async (values) => {
  try {
    const response = await fetch(`${url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    console.log('login:',response)

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Erreur d\'authentification');
    }
  } catch (error) {
    console.error(error);
  }
};
export const register = async (values) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("response", data); // Affichage de la réponse du serveur
      return data;
    } else {
      console.error('Erreur lors de la requête');
    }
  } catch (error) {
    console.error(error);
  }
};
export const saveNewUser = async (values, resetForm, handleModalClose, setMessageErreur, setMessageNotification) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("response", data); // Affichage de la réponse du serveur
      if (data.success === true) {
        setMessageNotification(data.message);
        resetForm();
        handleModalClose();
        // Actualiser la page
       // window.location.reload();
      } else {
        setMessageErreur(data.message);
      }
    } else {
      console.error('Erreur lors de la requête');
    }
  } catch (error) {
    console.error(error);
  }
};


export const getAllUsers = async () => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Erreur lors de la récupération des utilisateurs.");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${url}/${userId}`);
    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      throw new Error(`Erreur lors de la récupération de l'utilisateur avec l'ID ${userId}.`);
    }
  } catch (error) {
    console.error(error);
  }
};
export const changePassword = async (userId, passwordData) => {
  try {
    const response = await fetch(`${url}/${userId}/changepassword`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(passwordData)
    });
//console.log('pass',response)
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Erreur lors de la mise à jour du mot de passe pour l'utilisateur avec l'ID ${userId}.`);
    }
  } catch (error) {
    console.error(error);
  }
};



export const updateUser = async (userId, values, resetForm, handleModalClose, setMessageErreur, setMessageNotification) => {
  console.log('data', userId, values)
  try {
    const response = await fetch(`${url}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success === true) {
        setMessageNotification(data.message);
        resetForm();
        handleModalClose();
        // Actualiser la page
        //window.location.reload();
      } else {
        setMessageErreur(data.message);
      }
    } else {
      throw new Error(`Erreur lors de la mise à jour de l'utilisateur avec l'ID ${userId}.`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (userId, setMessageNotification) => {
  try {
    const response = await fetch(`${url}/${userId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success === true) {
        setMessageNotification(data.message);
      } else {
        setMessageNotification(data.message);
      }
    } else {
      throw new Error(`Erreur lors de la suppression de l'utilisateur avec l'ID ${userId}.`);
    }
  } catch (error) {
    console.error(error);
  }
};


