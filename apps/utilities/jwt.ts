import jwt from 'jsonwebtoken'
import { CONFIG } from '../configs'

export function generateAccessToken(user: any): any {
  return jwt.sign(user, CONFIG.secret.token ?? '', {
    expiresIn: '2h'
  })
}

export function verifyAccessToken(token: string): any {
  return jwt.verify(token, CONFIG.secret.token ?? '')
}
