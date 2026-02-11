import * as authService from '../services/auth.service.js';

export const signup = async (req, res) => {
    try {
        const { user, token } = await authService.signup(req.body);
        res.status(201).json({
            status: 'success',
            data: { user, token },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const { user, token } = await authService.login(phone, password);
        res.status(200).json({
            status: 'success',
            data: { user, token },
        });
    } catch (err) {
        res.status(401).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await authService.getMe(req.user.id);
        res.status(200).json({
            status: 'success',
            data: { user },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
};
