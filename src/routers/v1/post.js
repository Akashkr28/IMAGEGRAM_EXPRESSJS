// Here all the post related routes are present
// We look at the remaining url part after /posts
import express from 'express'

import { s3uploader } from '../../config/multerconfig.js'
import { createPost, getAllPosts, deletePost, updatePost } from '../../controllers/postController.js';
import { zodPostSchema } from '../../validators/zodPostSchema.js';
import { validate } from '../../validators/zodValidator.js'
import { isAdmin, isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router(); // Router object to modularize the routes

/**
 * @swagger
 * /post/create:
 *  post:
 *     summary: Create post
 *     description: Create a new post
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              
 *     responses:
 *          200:
 *              description: Post created successfully
 *          500:
 *              description: Internal server error
 *          400:
 *              description: Validation error
 *          401:
 *              description: Unauthorized
 */

router.post('/', isAuthenticated, s3uploader.single('image'), validate(zodPostSchema), createPost);

router.get('/', getAllPosts)

router.delete('/:id', isAuthenticated, deletePost);

router.post('/:id', isAuthenticated, isAdmin, s3uploader.single('image'), updatePost);

export default router;