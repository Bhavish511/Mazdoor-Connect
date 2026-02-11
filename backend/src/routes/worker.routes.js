import express from 'express';
import * as workerController from '../controllers/worker.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', workerController.getAllWorkers);
router.get('/:id', workerController.getWorker);

router.post('/profile', protect, restrictTo('worker'), workerController.createProfile);
router.patch('/profile/:id', protect, restrictTo('worker', 'admin'), workerController.updateProfile);

export default router;
