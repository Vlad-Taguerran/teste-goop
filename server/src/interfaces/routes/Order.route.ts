import { Router } from "express";
import { OrderRepository } from "../../infra/database/repository/OrderRepository";
import { ClientRepository } from "../../infra/database/repository/ClientRepository";
import { ProductRepository } from "../../infra/database/repository/ProductRepository";
import { OrderController } from "../controllers/OrderController";
import { authenticateMiddleware } from "../../infra/middleware/AuthMiddleware";

const orderRouter = Router();
const orderRepository = new OrderRepository();
const clientRepository = new ClientRepository();
const productRepository = new ProductRepository();
const controller = new OrderController(orderRepository,clientRepository,productRepository);

orderRouter.post('/order',authenticateMiddleware,(req,res)=> {controller.createOrder(req,res)});
orderRouter.patch('/order/:orderId',authenticateMiddleware,(req,res)=>{controller.paidOrder(req,res)});
orderRouter.get('/order',authenticateMiddleware,(req,res) =>{controller.listOrders(req,res)});

export default orderRouter;