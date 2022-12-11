"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign(user, config_1.CONFIG.secret.token, {
        expiresIn: "2h",
    });
}
exports.generateAccessToken = generateAccessToken;
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, config_1.CONFIG.secret.token);
}
exports.verifyAccessToken = verifyAccessToken;
