import dotenv from 'dotenv';
import app from './src/app.js';
import sequelize from './src/config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

sequelize
    .sync({ alter: true }) // Use { force: true } only in development if you want to recreate tables
    .then(() => {
        console.log('Database connected and synchronized');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
