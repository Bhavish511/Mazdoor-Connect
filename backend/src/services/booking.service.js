import { Booking, User } from '../models/index.js';

export const createBooking = async (bookingData) => {
    return await Booking.create(bookingData);
};

export const getCustomerBookings = async (customerId) => {
    return await Booking.findAll({
        where: { customerId },
        include: [{
            model: User,
            as: 'worker',
            attributes: ['name', 'avatar', 'phone']
        }]
    });
};

export const getWorkerBookings = async (workerId) => {
    return await Booking.findAll({
        where: { workerId },
        include: [{
            model: User,
            as: 'customer',
            attributes: ['name', 'phone', 'address']
        }]
    });
};

export const updateBookingStatus = async (id, status, finalPrice) => {
    const booking = await Booking.findByPk(id);
    if (!booking) throw new Error('Booking not found');

    const update = { status };
    if (finalPrice) update.finalPrice = finalPrice;

    return await booking.update(update);
};

export const getBookingById = async (id) => {
    return await Booking.findByPk(id, {
        include: [
            { model: User, as: 'worker' },
            { model: User, as: 'customer' }
        ]
    });
};
