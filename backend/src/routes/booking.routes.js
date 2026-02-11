import express from 'express';
import * as bookingController from '../controllers/booking.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/', restrictTo('customer'), bookingController.create);
router.get('/customer', restrictTo('customer'), bookingController.getForCustomer);
router.get('/worker', restrictTo('worker'), bookingController.getForWorker);
router.patch('/:id/status', restrictTo('worker', 'admin'), bookingController.updateStatus);

export default router;
