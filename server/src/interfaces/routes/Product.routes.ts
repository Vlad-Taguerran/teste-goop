import { Router } from "express";
import { ProductRepository } from "../../infra/database/repository/ProductRepository";
import { ProductController } from "../controllers/ProductController";

const productRouter = Router();
const productRepository = new ProductRepository()
const controller = new ProductController(productRepository);
productRouter.get('/product',(req,res)=>{controller.listProducts(req,res)});

export default productRouter;