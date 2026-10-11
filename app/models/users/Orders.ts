export interface UserOrder {
    id: number;
    name: string;
    items: UserOrderItem[];
    totalPrice: number;
    createdAt: Date;
}

export interface UserOrderItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
}