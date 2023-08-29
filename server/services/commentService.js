import pool from "../config/database.js";

// Fonction pour créer un commentaire pour un utilisateur donné et un article donné
export const createComment = (commentData, callback) => {
  const { userId, articleId, content } = commentData;
  const createdAt = new Date();

  // Insérer le commentaire dans la table "comments"
  const commentQuery = 'INSERT INTO comments (content, user_id, article_id, created_at) VALUES (?, ?, ?, ?)';
  pool.query(commentQuery, [content, userId, articleId, createdAt], (error, commentResult) => {
    if (error) {
      console.error('Erreur lors de la création du commentaire:', error);
      callback(error);
      return;
    }

    // Récupérer l'ID du commentaire nouvellement créé
    const commentId = commentResult.insertId;

    // Insérer l'ID de l'utilisateur et l'ID du commentaire dans la table de jointure "user_comments"
    const userCommentQuery = 'INSERT INTO user_comments (user_id, comment_id) VALUES (?, ?)';
    pool.query(userCommentQuery, [userId, commentId], (error) => {
      if (error) {
        console.error("Erreur lors de l'insertion du commentaire dans la table de jointure user_comments:", error);
        callback(error);
        return;
      }

      // Insérer l'ID de l'article et l'ID du commentaire dans la table de jointure "article_comments"
      const articleCommentQuery = 'INSERT INTO article_comments (article_id, comment_id) VALUES (?, ?)';
      pool.query(articleCommentQuery, [articleId, commentId], (error) => {
        if (error) {
          console.error("Erreur lors de l'insertion du commentaire dans la table de jointure article_comments:" , error);
          callback(error);
          return;
        }

        console.log('Commentaire créé avec succès');
        callback(null);
      });
    });
  });
};

// Récupérer tous les commentaires avec l'article et l'utilisateur associés
export const getAllCommentsWithDetails = (callback) => {
  const query = `
    SELECT comments.*, articles.title AS article_title, users.name AS user_name
    FROM comments
    INNER JOIN articles ON comments.article_id = articles.id
    INNER JOIN users ON comments.user_id = users.id
  `;
  pool.query(query, (error, comments) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, comments);
  });
};

// Récupérer les commentaires d'un article donné
export const getCommentsByArticle = (articleId, callback) => {
  const query = `
    SELECT comments.*, users.name AS user_name
    FROM comments
    INNER JOIN users ON comments.user_id = users.id
    WHERE comments.article_id = ?
  `;
  pool.query(query, [articleId], (error, comments) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, comments);
  });
};

// Récupérer les commentaires d'un utilisateur donné
export const getCommentsByUser = (userId, callback) => {
  const query = 'SELECT * FROM comments WHERE user_id = ?';
  pool.query(query, [userId], (error, comments) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, comments);
  });
};

// Récupérer un commentaire par son ID
export const getCommentsById = (commentId, callback) => {
  const query = 'SELECT * FROM comments WHERE id = ?';
  pool.query(query, [commentId], (error, comments) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, comments[0]);
  });
};

// Mettre à jour un commentaire
export const updateComment = (commentId, commentData, callback) => {
  const { content } = commentData;
 // console.log('update;',commentData.content)
  getCommentsById(commentId, (error, commentToUpdate) => {
    if (error) {
      callback(error, null);
    } else {
      if (commentToUpdate) {
        const query = 'UPDATE comments SET content = ? WHERE id = ?';
        pool.query(query, [content, commentId], (err, result) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, result.affectedRows > 0);
          }
        });
      } else {
        callback(null, false);
      }
    }
  });
}

// Supprimer un commentaire
export const deleteComment = (commentId, callback) => {
  const query = 'DELETE FROM comments WHERE id = ?';
  pool.query(query, [commentId], (error, result) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, result.affectedRows > 0);
  });
};
