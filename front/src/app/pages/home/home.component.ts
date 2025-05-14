import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Product, DataService, Order } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{
  
products: Product[] = [];
orders: Order[] = [];
filteredOrders: Order[] = [];
selectedStatus: string = '';
cart: { [productId: string]: number } = {};
  constructor(private dataService: DataService,private authService: AuthService) {}

  ngOnInit(): void {
    this.dataService.products$.subscribe(data => this.products = data);
    this.dataService.orders$.subscribe(data => {
    this.orders = data;
    this.applyFilter(); 
  });
    this.dataService.fetchProducts();
    this.dataService.fetchOrders();
  }

  adicionar(product: Product) {
    const current = this.cart[product.id] || 0;
    if (current < product.stockQuantity) {
      this.cart[product.id] = current + 1;
  
    }
  }

  remover(product: Product) {
    const current = this.cart[product.id] || 0;
    if (current > 0) {
      this.cart[product.id] = current - 1;
      if (this.cart[product.id] === 0) delete this.cart[product.id];
    }
  }

  getCartItems(): { product: Product, quantity: number }[] {
    return Object.entries(this.cart).map(([id, quantity]) => {
      const product = this.products.find(p => p.id === id)!;
      return { product, quantity };
    });
  }

  getTotal(): number {
    return this.getCartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }
   
 finalizarPedido() {
    const clientId = this.authService.getUserId();
  const itens = this.getCartItems().map(item => ({
    productId: item.product.id,
    quantity: item.quantity
  }));

  const order = {
    clientId: clientId!,
    itens
  };

  this.dataService.postOrder(order).subscribe({
    next: (res) => {
      console.log('Pedido finalizado com sucesso!', res);
      this.cart = {}; 
      this.orders.push(res);
    },
    error: (err) => {
      console.error('Erro ao finalizar pedido:', err);
    }
  });

  console.log('Enviando pedido:', order);
}


  applyFilter() {
    this.filteredOrders = this.selectedStatus
      ? this.orders.filter(order => order.status === this.selectedStatus)
      : this.orders;
  }

  onStatusChange(orderId: string, newStatus: string) {
    this.dataService.updateOrderStatus(orderId, newStatus).subscribe();
  }
}
