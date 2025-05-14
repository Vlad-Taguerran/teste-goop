import { UserPayload } from "../middleware/AuthMiddleware";


declare module 'express' {
  interface Request {
    user?: UserPayload;
  }
}