
import express from 'express';
import { createCommentController, deleteCommentController, getAllCommentsWithDetailsController, getCommentByIdController, getCommentsByArticleController, getCommentsByUserController, updateCommentController } from '../controllers/CommentController.js';


const router = express.Router();

router.post('/', createCommentController);
router.get('/', getAllCommentsWithDetailsController);
router.get('/article/:articleId', getCommentsByArticleController);
router.get('/user/:userId', getCommentsByUserController);
router.get('/:commentId', getCommentByIdController);
router.put('/:commentId', updateCommentController);
router.delete('/:commentId', deleteCommentController);

export default router;
