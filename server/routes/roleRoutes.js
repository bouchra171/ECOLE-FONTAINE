import express from 'express';
import { createRole, getAllRoles, getRoleById, updateRole, deleteRole } from '../controllers/RoleController.js';
/*import adminAuthMiddleware from '../middlewares/authMiddleware.js';
import { verifyToken } from '../middlewares/verifyToken.js';*/

const router = express.Router();

// Créer un rôle
router.post('/', createRole);

// Récupérer tous les rôles
router.get('/', getAllRoles);

// Récupérer un rôle par son ID
router.get('/:id', getRoleById);

// Mettre à jour un rôle
router.put('/:id', updateRole);

// Supprimer un rôle
router.delete('/:id', deleteRole);

export default router;
