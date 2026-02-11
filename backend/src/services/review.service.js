import { Review, Worker, User, sequelize } from '../models/index.js';

export const createReview = async (reviewData) => {
    const review = await Review.create(reviewData);

    // Update worker average rating and review count
    const stats = await Review.findAll({
        where: { workerId: review.workerId },
        attributes: [
            [sequelize.fn('AVG', sequelize.col('rating')), 'avgRating'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['workerId'],
        raw: true
    });

    if (stats.length > 0) {
        await Worker.update(
            {
                rating: parseFloat(stats[0].avgRating).toFixed(1),
                reviewCount: stats[0].count
            },
            { where: { userId: review.workerId } }
        );
    }

    return review;
};

export const getWorkerReviews = async (workerId) => {
    return await Review.findAll({
        where: { workerId },
        include: [{
            model: User,
            as: 'customer',
            attributes: ['name', 'avatar']
        }]
    });
};
