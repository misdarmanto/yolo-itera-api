"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const config_1 = require("../config");
function hashPassword(password) {
    return require("crypto")
        .createHash("sha1")
        .update(password + config_1.CONFIG.secret.password_encryption)
        .digest("hex");
}
exports.hashPassword = hashPassword;
