import { OrderItemProps } from "../types/OrderItemProps";

export class OrderItem {
  constructor(
    public readonly props: OrderItemProps,
  ) {}

  public calculateItemTotalPrice(): number{
    return this.props.quantity * this.props.unityPrice;
  }

  public increaseQuantity(amount: number): void{
    this.props.quantity += amount;
  }

}