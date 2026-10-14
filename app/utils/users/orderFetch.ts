import type { UserOrder } from "~/models/users/Orders";
import type { FetchConfig } from "~/models/FetchConfig";

export function fetchUserOrders<T = UserOrder, B = UserOrder>(url: string, config : FetchConfig<B> | undefined): Promise<T>  {
      let newConfig : FetchConfig<B> = {
        baseURL: '/api/orders',
        ...config,
        retry: 1
    };
    return $fetch<T>(url, newConfig)
}
