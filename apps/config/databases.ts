import dotenv from 'dotenv';
dotenv.config();

export const DATABASES = {
    media: {
        db_name: process.env.DB_NAME || 'project_itera',
        db_host: process.env.DB_HOST || '127.0.0.1',
        db_port: process.env.DB_PORT || 3306,
        db_username: process.env.DB_USERNAME || 'misdar',
        db_password: process.env.DB_PASSWORD || 'root',
        db_log: process.env.DB_LOG == "true",
    },
    redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,
    }
}