import { OrderProps, OrderStatus } from "../types/OrderProps";
import { OrderItem } from "./OrderItem";
import { Product } from "./Product";

export class Order {
  constructor(
    public props: OrderProps,
    public readonly id: string) {
      this.recauculateAmount();
    }


    public addItem(product: Product, quantity: number): void{
        if (this.props.status !== OrderStatus.PENDING) {
      throw new Error("Não é possível adicionar itens a um pedido que não esteja PENDENTE.");
    }
    const existingItemIndex = this.props.itens.findIndex(item => item.props.productId === product.id);
    if(existingItemIndex > -1){
      const existingItem = this.props.itens[existingItemIndex];
      const newQuantity = existingItem.props.quantity + quantity;
    
    this.props.itens[existingItemIndex] = new OrderItem({
      productId: product.id,
      productName: product.name,
      quantity: newQuantity,
      unityPrice: product.price
    });
  }else{
    this.props.itens.push(new OrderItem({
      productId: product.id,
      productName: product.name,
      quantity: quantity,
      unityPrice: product.price
    }));
  }
  this.recauculateAmount();

    }

    public removeItem(productId: string){
      if (this.props.status !== OrderStatus.PENDING) {
      throw new Error("Não é possível remover itens de um pedido que não esteja PENDENTE.");
    }
    this.props.itens = this.props.itens.filter(item => item.props.productId !== productId);
    this.recauculateAmount();
    }

    private recauculateAmount(): void{
      this.props.totalAmount = this.props.itens.reduce((sum, item)=> sum + item.calculateItemTotalPrice(),0);
    }
}