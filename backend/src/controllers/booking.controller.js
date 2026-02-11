import * as bookingService from '../services/booking.service.js';

export const create = async (req, res) => {
    try {
        const booking = await bookingService.createBooking({ ...req.body, customerId: req.user.id });
        res.status(201).json({
            status: 'success',
            data: { booking },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const getForCustomer = async (req, res) => {
    try {
        const bookings = await bookingService.getCustomerBookings(req.user.id);
        res.status(200).json({
            status: 'success',
            data: { bookings },
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
        const bookings = await bookingService.getWorkerBookings(req.user.id);
        res.status(200).json({
            status: 'success',
            data: { bookings },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status, finalPrice } = req.body;
        const booking = await bookingService.updateBookingStatus(req.params.id, status, finalPrice);
        res.status(200).json({
            status: 'success',
            data: { booking },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};
