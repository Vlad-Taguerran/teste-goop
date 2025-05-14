import { OrderItemProps } from "../types/OrderItemProps";

export class OrderItem {
  private productId: string;
  private  productName: string;
  private  quantity: number;
  private  unityPrice: number;
  constructor(
    public readonly props: OrderItemProps,
  ) {
    this.productId = props.productId;
    this.productName = props.productName;
    this.quantity = props.quantity;
    this.unityPrice = props.unityPrice;
  }

  public calculateItemTotalPrice(): number{
    return this.quantity * this.unityPrice;
  }

  public increaseQuantity(amount: number): void{
    this.quantity += amount;
  }

}