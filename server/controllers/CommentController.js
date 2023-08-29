import {
  createComment,
  getAllCommentsWithDetails,
  getCommentsByArticle,
  getCommentsByUser,
  getCommentsById,
  updateComment,
  deleteComment
} from '../services/commentService.js';

// Créer un commentaire
export const createCommentController = (req, res) => {
  const commentData = req.body;

  createComment(commentData, (error) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Erreur lors de la création du commentaire' });
    }

    return res.status(201).json({ success: true, message: 'Commentaire créé avec succès' });
  });
};

// Récupérer tous les commentaires avec les détails associés
export const getAllCommentsWithDetailsController = (req, res) => {
  getAllCommentsWithDetails((error, comments) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Erreur lors de la récupération des commentaires' });
    }

    return res.status(200).json(comments);
  });
};

// Récupérer les commentaires d'un article donné
export const getCommentsByArticleController = (req, res) => {
  const { articleId } = req.params;

  getCommentsByArticle(articleId, (error, comments) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Erreur lors de la récupération des commentaires' });
    }

    return res.status(200).json( comments );
  });
};

// Récupérer les commentaires d'un utilisateur donné
export const getCommentsByUserController = (req, res) => {
  const { userId } = req.params;

  getCommentsByUser(userId, (error, comments) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Erreur lors de la récupération des commentaires' });
    }

    return res.status(200).json(comments);
  });
};

// Récupérer un commentaire par son ID
export const getCommentByIdController = (req, res) => {
  const { commentId } = req.params;

  getCommentsById(commentId, (error, comment) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Erreur lors de la récupération du commentaire' });
    }

    if (!comment) {
      return res.status(404).json({ success: false, message: 'Commentaire introuvable' });
    }

    return res.status(200).json({ success: true, comment });
  });
};

// Mettre à jour un commentaire
export const updateCommentController = (req, res) => {
  const { commentId } = req.params;
  const updatedComment = req.body;

  updateComment(commentId, updatedComment, (error, updated) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour du commentaire' });
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Commentaire introuvable' });
    }

    return res.status(200).json({ success: true, message: 'Commentaire mis à jour avec succès' });
  });
};


// Supprimer un commentaire
export const deleteCommentController = (req, res) => {
  const { commentId } = req.params;

  deleteComment(commentId, (error, deleted) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Erreur lors de la suppression du commentaire' });
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Commentaire introuvable' });
    }

    return res.status(200).json({ success: true, message: 'Commentaire supprimé avec succès' });
  });
};
