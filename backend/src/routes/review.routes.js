import express from 'express';
import * as reviewController from '../controllers/review.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/worker/:workerId', reviewController.getForWorker);
router.post('/', protect, restrictTo('customer'), reviewController.create);

export default router;
