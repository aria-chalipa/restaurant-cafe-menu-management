export interface UserOrder {
    id: number;
    name: string;
    items: UserOrderItem[];
    totalPrice: number;
    status: OrderStatus;
    createdAt: Date;
}

export interface UserOrderItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

export enum OrderStatus {
    Pending = "pending",
    Completed = "completed",
    Cancelled = "cancelled"
}