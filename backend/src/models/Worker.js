import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Worker = sequelize.define('Worker', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bio: {
        type: DataTypes.TEXT
    },
    experience: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    priceMin: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    priceMax: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    specialties: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    location: {
        type: DataTypes.STRING
    },
    isCnicVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isPoliceVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isSkillVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    portfolio: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    rating: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0
    },
    reviewCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    jobsCompleted: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

export default Worker;
