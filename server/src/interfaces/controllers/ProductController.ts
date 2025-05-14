import { Request, Response } from "express";
import { ProductRepository } from "../../infra/database/repository/ProductRepository";
import { ProductMapper } from "../../infra/database/mongoDB/mapper/ProductMapper";

export class ProductController {
  constructor( private readonly productRepository: ProductRepository){}

  async listProducts(req:Request,res:Response){
   
    try{
  const productList = await this.productRepository.findAll();
      return res.json(productList.map(product => ProductMapper.toDto(product)));
    }catch(error){
      console.log(error)
    }
  }
}