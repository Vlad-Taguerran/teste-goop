import { Router } from "express";
import { ClientRepository } from "../../infra/database/repository/ClientRepository";
import { HashService } from "../../infra/services/HashService";
import { AuthController } from "../controllers/AuthController";

const authRoute = Router();
const clientRepository = new ClientRepository();
const hashService = new HashService();
const userController = new AuthController(clientRepository,hashService);

authRoute.post('/auth/login',(req,res)=>{userController.loging(req,res)})

export default authRoute;