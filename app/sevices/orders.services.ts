import type { UserOrder } from "~/models/users/Orders";
import { fetchUserOrders } from "~/utils/users/orderFetch";

export const PostOrders = (order : UserOrder) => {
    return fetchUserOrders<UserOrder, UserOrder>('/Orders', { method: 'POST', body: order })
}