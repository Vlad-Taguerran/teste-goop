class Product {
  constructor(
    public name: string,
    public price: number,
    public stock: number,
    public readonly id?: string
  ) {
    this.validate
  }

  private validate(){
    if(this.price <= 0){
      throw 'Insira um valor maior que 0'
    }
  }
}
