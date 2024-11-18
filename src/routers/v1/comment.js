// Write an API to create comments on a post or another Comment

import express from 'express';
import { createComment } from '../../controllers/commentController.js';
import { zodCommentSchema } from '../../validators/zodCommentSchema.js';
import { validate } from '../../validators/zodValidator.js';

const router = express.Router();    

router.post('/create', validate(zodCommentSchema), createComment);

export default router