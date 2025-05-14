import { NextFunction,Request,Response } from 'express';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import jwtConfig from '../jwt/jwtConfig';


export interface UserPayload extends JwtPayload {
  name: string;
  id: string
}

// Middleware de autenticação
export const authenticateMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; 
  console.log(token)
  if (token == null) {
    res.sendStatus(401);
    return ;
  }

  jwt.verify(token,jwtConfig.secret, (err, user) => {
    if (err) {
      console.error('Erro ao verificar token:', err);
       res.sendStatus(403); 
       return;
    }
   
    req.user = user as UserPayload;
    next(); 
  });
};