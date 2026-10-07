export interface MenuItems {
    id: number;
    name: string;
    description: string;
    price: number;
    category: Category;
    type: string;
}

export enum Category {
    COFFEE  = 'coffee',
    TEA = 'tea',
    ICED_COFFEE = 'iced coffee',
    ICED_TEA = 'iced tea',
    MOCTEL = 'moctel',
    HOT_DRINK = 'hot drink',
    FOOD = 'food',
    CAKE = 'cake',

}