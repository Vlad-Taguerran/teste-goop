import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
export interface Product {
 id: string;
  name: string;
  price: number;
  stockQuantity: number;
}
export interface Order {
  id: string;
  clientId: string;
  status: string; // valores como "PENDING", "COMPLETED"
  orderDate: string;
  totalAmount: number;
  itens: OrderItem[];
}
export interface OrderItem {
  productId: string;
  productName?: string; // se quiser mostrar no frontend
  quantity: number;
  unityPrice?: number;
}

export interface OrderPayload {
  clientId: string;
  itens: OrderItem[];
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
private itemsSubject = new BehaviorSubject<Product[]>([]);
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private ordersSubject = new BehaviorSubject<Order[]>([]);
public orders$ = this.ordersSubject.asObservable();
  public products$ = this.productsSubject.asObservable();
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  
  fetchProducts(): void {
    this.http.get<Product[]>(this.apiUrl+'/product')
      .subscribe(data => this.productsSubject.next(data));
  }
 

  removeProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(tap(() => this.fetchProducts()))
      .subscribe();
  }
  // orders//
   postOrder(order: Partial<OrderPayload>): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/order`, order).pipe(
      tap(() => this.fetchProducts()) 
    );
  }
  fetchOrders(): void {
  this.http.get<Order[]>(`${this.apiUrl}/order`)
    .subscribe(data => this.ordersSubject.next(data));
}
updateOrderStatus(orderId: string, status: string): Observable<any> {
  return this.http.patch(`${this.apiUrl}/order/${orderId}`, { status })
    .pipe(tap(() => this.fetchOrders()));
}
}
