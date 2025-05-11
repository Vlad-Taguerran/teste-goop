type OrderProps = {
  clientId:string,
  status: string,
  itens:{productId:string,stock:number,price:number}[];

}