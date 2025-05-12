import { Request, Response } from "express";
import { ProductRepository } from "../../infra/database/repository/ProductRepository";

export class ProductController {
  constructor( private readonly productRepository: ProductRepository){}

  async listProducts(req:Request,res:Response){
   
    try{
  const result = await this.productRepository.findAll();
      return res.json(result);
    }catch(error){
      console.log(error)
    }
  }
}