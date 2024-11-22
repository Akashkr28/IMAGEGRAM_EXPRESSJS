import express from 'express';
import { getCommentById, createComment } from '../../controllers/commentController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:id', isAuthenticated, getCommentById);

router.post('/', isAuthenticated, createComment);

export default router;