import config from "../../utils/config";

const url = `${config.API_URL}/comments`;

export const getAllComments = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch comments');
  }
};

export const createComment = async (comment) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create comment');
  }
};

export const updateComment = async (commentId, updatedComment) => {
  try {
    const urle = `${url}/${commentId}`;
    const response = await fetch(urle, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedComment),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Erreur lors de la modificatioin du commentaire avec l'ID ${commentId}`);
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update comment');
  }
};

export const deleteComment = async (commentId) => {
  try {
    const urle = `${url}/${commentId}`;
    const response = await fetch(urle, {
      method: 'DELETE',
    });
    console.log('reponse', response)
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Erreur lors de la suppression du commentaire avec l'ID ${commentId}`);
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete comment');
  }
};
