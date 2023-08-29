import express from 'express';
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/CategoryController.js';
/*import adminAuthMiddleware from '../middlewares/authMiddleware.js';
import { verifyToken } from '../middlewares/verifyToken.js';*/

const router = express.Router();

// Créer une catégorie
router.post('/', createCategory);

// Récupérer toutes les catégories
router.get('/', getAllCategories);

// Récupérer une catégorie par son ID
router.get('/:id', getCategoryById);

// Mettre à jour une catégorie
router.put('/:id', updateCategory);

// Supprimer une catégorie
router.delete('/:id', deleteCategory);

export default router;
