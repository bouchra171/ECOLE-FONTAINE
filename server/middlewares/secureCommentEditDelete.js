// Middleware pour sécuriser la modification d'un commentaire
import * as commentService from '../services/commentService.js';
import * as userService from '../services/userService.js';

const secureCommentEditDelete = (req, res, next) => {
    try {
        const { commentId } = req.params; // Récupérer l'ID du commentaire à modifier
        const { userId } = req.body; // Récupérer l'ID de l'utilisateur et son rôle

        // Récupérons le role de l'utilisateur pour savoir s'il est admin
        const user = userService.getUserById(userId)
        // Récuperons les details du commentaires  
        const comment = commentService.getCommentsById(commentId)
        if (!comment) {
            return res.status(404).json({success: false, message: 'Commentaire non trouvé' });
        }
        // Vérifier si l'utilisateur est administrateur ou si c'est l'auteur du commentaire
        if (user.role === 'Admin' || user.id === comment.user_id) {
            return next(); // Autoriser la modification par l'administrateur ou par l'utilisateur créateur du commentaire
        }

        // Si ni l'administrateur ni l'utilisateur créateur du commentaire ne sont autorisés, renvoyer une réponse d'erreur
        return res.status(403).json({success: false, message: 'Accès refusé. Vous n\'êtes pas autorisé à modifier ce commentaire.' });
    } catch (error) {
        return res.status(500).json({success: false, message: 'Une erreur est survenue lors de la vérification de l\'accès à la modification du commentaire.' });
    }
};

export default secureCommentEditDelete;