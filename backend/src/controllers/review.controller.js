import * as reviewService from '../services/review.service.js';

export const create = async (req, res) => {
    try {
        const review = await reviewService.createReview({ ...req.body, customerId: req.user.id });
        res.status(201).json({
            status: 'success',
            data: { review },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const getForWorker = async (req, res) => {
    try {
        const reviews = await reviewService.getWorkerReviews(req.params.workerId);
        res.status(200).json({
            status: 'success',
            data: { reviews },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};
