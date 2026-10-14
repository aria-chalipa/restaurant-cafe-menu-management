import type { UserOrder } from "~/models/users/Orders";
import { fetchUserOrders } from "~/utils/users/orderFetch";

export const orders = (order : UserOrder) => {
    return fetchUserOrders<UserOrder, UserOrder>('/Orders', { method: 'POST', body: order })
}