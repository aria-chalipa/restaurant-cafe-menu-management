import type { UserOrder } from '@/models/users/Orders';

export const useUserOrders = defineStore('userOrders', () => {
    const userOrders = ref([
    ]);
    const addUserOrder = (orders: UserOrder) => {
        // @ts-ignore
        userOrders.value.push(orders);
    };
    const clearUserOrders = () => {
        userOrders.value = [];
    };
    return {
        userOrders,
        addUserOrder,
        clearUserOrders
    }
})