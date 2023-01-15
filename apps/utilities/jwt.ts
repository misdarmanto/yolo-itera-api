import jwt from "jsonwebtoken";
import { CONFIG } from "../config";

export function generateAccessToken(user: any) {
  return jwt.sign(user, CONFIG.secret.token, {
    expiresIn: "2h",
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, CONFIG.secret.token);
}
