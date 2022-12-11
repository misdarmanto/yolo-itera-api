"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.CONFIG = {
    // APP CONFIGURATION
    app_version: process.env.APP_VERSION || '1.0.0',
    app_semantic: process.env.APP_SEMANTIC || '0',
    env: process.env.APP_ENV || 'development',
    port: process.env.PORT ?? 6001,
    log: process.env.LOG == "true",
    secret: {
        token: process.env.TOKEN_SECRET || 'qwerty',
        password_encryption: process.env.SECRET_PASSWORD_ENCRYPTION || '',
        admin_password_encryption: process.env.SECRET_ADMIN_PASSWORD_ENCRYPTION || '',
        pin_encryption: process.env.SECRET_PIN_ENCRYPTION || '',
    },
    authorization: {
        username: process.env.AUTHORIZATION_USERNAME || 'areti',
        passsword: process.env.AUTHORIZATION_PASSWORD || 'p!s4n9-g0d0k-s3g0-t!wul'
    },
    base_url: process.env.BASE_URL || `http://localhost:${process.env.APP_PORT}`
};
