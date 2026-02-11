import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    customerId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    workerId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    service: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    timeSlot: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'in-progress', 'completed', 'cancelled'),
        defaultValue: 'pending'
    },
    priceMin: {
        type: DataTypes.DECIMAL(10, 2)
    },
    priceMax: {
        type: DataTypes.DECIMAL(10, 2)
    },
    finalPrice: {
        type: DataTypes.DECIMAL(10, 2)
    },
    paymentMethod: {
        type: DataTypes.ENUM('cash', 'jazzcash', 'easypaisa'),
        defaultValue: 'cash'
    },
    paymentStatus: {
        type: DataTypes.ENUM('unpaid', 'paid'),
        defaultValue: 'unpaid'
    }
});

export default Booking;
