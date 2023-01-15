import { CONFIG } from "../config";

export function hashPassword (password: string) {
    return require("crypto")
    .createHash("sha1")
    .update(password + CONFIG.secret.password_encryption)
    .digest("hex");
}