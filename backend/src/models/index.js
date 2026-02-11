import User from './User.js';
import Worker from './Worker.js';
import Booking from './Booking.js';
import Review from './Review.js';

// User <-> Worker (One-to-One)
User.hasOne(Worker, { foreignKey: 'userId', as: 'workerProfile' });
Worker.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User (Customer) <-> Booking (One-to-Many)
User.hasMany(Booking, { foreignKey: 'customerId', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });

// User (Worker) <-> Booking (One-to-Many)
User.hasMany(Booking, { foreignKey: 'workerId', as: 'assignments' });
Booking.belongsTo(User, { foreignKey: 'workerId', as: 'worker' });

// Booking <-> Review (One-to-One)
Booking.hasOne(Review, { foreignKey: 'bookingId', as: 'review' });
Review.belongsTo(Booking, { foreignKey: 'bookingId', as: 'booking' });

// User (Customer/Worker) <-> Review (One-to-Many)
User.hasMany(Review, { foreignKey: 'customerId', as: 'reviewsGiven' });
Review.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });

User.hasMany(Review, { foreignKey: 'workerId', as: 'reviewsReceived' });
Review.belongsTo(User, { foreignKey: 'workerId', as: 'worker' });

export {
    User,
    Worker,
    Booking,
    Review
};
