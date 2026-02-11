import * as workerService from '../services/worker.service.js';

export const createProfile = async (req, res) => {
    try {
        const profile = await workerService.createWorkerProfile({ ...req.body, userId: req.user.id });
        res.status(201).json({
            status: 'success',
            data: { profile },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const getAllWorkers = async (req, res) => {
    try {
        const workers = await workerService.getWorkers(req.query);
        res.status(200).json({
            status: 'success',
            results: workers.length,
            data: { workers },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const getWorker = async (req, res) => {
    try {
        const worker = await workerService.getWorkerById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { worker },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const profile = await workerService.updateWorkerProfile(req.params.id, req.body);
        res.status(200).json({
            status: 'success',
            data: { profile },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};
