import express from 'express';
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  filterArticle,
  getArticleWithComments,
  getArticlesTitreWithComments
} from '../controllers/ArticleController.js';

/*import adminAuthMiddleware from '../middlewares/authMiddleware.js';
import { verifyToken } from '../middlewares/verifyToken.js';*/
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Routes pour les articles
router.get('/', getAllArticles); // Rechercher des articles
router.get('/comments', getArticlesTitreWithComments); // Récupérer tous les articles
router.get('/:id', getArticleById); // Récupérer un article par son ID
router.post('/', upload.single('image'), createArticle); // Créer un nouvel article avec le middleware de gestion du téléchargement de fichiers
router.put('/:id', upload.single('image'), updateArticle); // Mettre à jour un article avec le middleware de gestion du téléchargement de fichiers
router.delete('/:id', deleteArticle); // Supprimer un article
router.get('/filter/:query', filterArticle); // Rechercher des articles
router.get('/:id/comments', getArticleWithComments); // Rechercher des articles

export default router;
