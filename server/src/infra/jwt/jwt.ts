import jwt from 'jsonwebtoken';
import jwtConfig from './jwtConfig';

interface Payload {
  id: string;
  name: string;
}

export function generateToken(payload: Payload) {
  return jwt.sign({id:payload.id,name:payload.name},  jwtConfig.secret, { expiresIn:  jwtConfig.expiresIn });
}

export function verifyToken(token: string) {
  return jwt.verify(token,  jwtConfig.secret);
}
