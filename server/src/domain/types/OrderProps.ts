import { OrderItem } from "../entities/OrderItem";


export enum OrderStatus {
  PENDING = "PENDING", 
  PAID = "PAID",       
  CANCELLED = "CANCELLED", 
}
export type OrderProps = {
  clientId:string,
  status: string,
  itens:OrderItem[],
  orderDate: Date,
  totalAmount: number

}