import { Worker, User } from '../models/index.js';
import { Op } from 'sequelize';

export const createWorkerProfile = async (workerData) => {
    return await Worker.create(workerData);
};

export const getWorkers = async (filters = {}) => {
    const where = {};
    if (filters.category) where.category = filters.category;
    if (filters.location) {
        where.location = { [Op.iLike]: `%${filters.location}%` };
    }

    return await Worker.findAll({
        where,
        include: [{
            model: User,
            as: 'user',
            attributes: ['name', 'avatar', 'phone']
        }]
    });
};

export const getWorkerById = async (id) => {
    const worker = await Worker.findByPk(id, {
        include: [{
            model: User,
            as: 'user',
            attributes: ['name', 'avatar', 'phone', 'email', 'address']
        }]
    });
    if (!worker) throw new Error('Worker not found');
    return worker;
};

export const updateWorkerProfile = async (id, updateData) => {
    const worker = await Worker.findByPk(id);
    if (!worker) throw new Error('Worker not found');
    return await worker.update(updateData);
};
