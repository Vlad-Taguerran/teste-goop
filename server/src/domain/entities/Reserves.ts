export class ReserveItem {
  constructor(
    public productId: string,
    public quantity: number
  ) {}
}

export class Reserve {
  constructor(
    public orderId: string,
    public items: ReserveItem[],
    public createdAt: Date,
    public expiresAt: Date,
    public completed: boolean
  ) {}
  completedReserve(){
    this.completed = true;
  }
}