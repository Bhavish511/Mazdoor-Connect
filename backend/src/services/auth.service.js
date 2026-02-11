import { User } from '../models/index.js';
import { generateToken } from '../utils/jwt.js';

export const signup = async (userData) => {
    const { phone } = userData;
    const existingUser = await User.findOne({ where: { phone } });
    if (existingUser) {
        throw new Error('User with this phone number already exists');
    }

    const user = await User.create(userData);
    const token = generateToken(user.id);

    return { user, token };
};

export const login = async (phone, password) => {
    const user = await User.findOne({ where: { phone } });
    if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid phone number or password');
    }

    const token = generateToken(user.id);
    return { user, token };
};

export const getMe = async (userId) => {
    const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }
    });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};
