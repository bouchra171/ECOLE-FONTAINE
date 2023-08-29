// userRoutes.js
import express from 'express';
const router = express.Router();
import * as userController from '../controllers/UserController.js';
/*import adminAuthMiddleware from '../middlewares/authMiddleware.js';
import { verifyToken } from '../middlewares/verifyToken.js';*/

// Définissez vos routes pour les utilisateurs
router.post('/login', userController.login);
router.post('/logout', userController.login);
router.post('/register', userController.createUser);
router.post('/:id/changepassword', userController.updateUserPassword);
router.get('/',userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
