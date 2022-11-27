import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
    // APP CONFIGURATION
    app_version: process.env.APP_VERSION || '1.0.0',
    app_semantic: process.env.APP_SEMANTIC || '0',
    env: process.env.APP_ENV || 'development',
    port: process.env.APP_PORT ?? 6001,
    log: process.env.LOG == "true",
    secret: {
        token: process.env.TOKEN_SECRET || '',
        password_encryption: process.env.SECRET_PASSWORD_ENCRYPTION || '',
        admin_password_encryption: process.env.SECRET_ADMIN_PASSWORD_ENCRYPTION || '',
        pin_encryption: process.env.SECRET_PIN_ENCRYPTION || '',
    },
    authorization: {
        username: process.env.AUTHORIZATION_USERNAME || 'itera',
        passsword: process.env.AUTHORIZATION_PASSWORD || 'secret'
    },
    base_url: process.env.BASE_URL || `http://localhost:${process.env.APP_PORT}`
}