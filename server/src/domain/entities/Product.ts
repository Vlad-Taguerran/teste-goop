export class Product {
  constructor(
    public name: string,
    public price: number,
    public stockQuantity: number,
    public readonly id: string
  ) {
    this.validate();
  }

  private validate(){
    if(this.price <= 0){
      throw new Error('Insira um valor maior que 0')
    }
  }
}
