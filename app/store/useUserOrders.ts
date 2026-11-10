import type { UserOrder } from '@/models/users/Orders';

export const useUserOrders = defineStore('userOrders', () => {
    const userOrders = ref<UserOrder[]>([
    ]);
    const addUserOrder = (orders: UserOrder) => {
        userOrders.value.push(orders);
    };
    const updateUserOrder = (order: UserOrder) => {
        const index = userOrders.value.findIndex(o => o.id === order.id);
        if (index !== -1) {
            userOrders.value[index] = order;
        }
    };
    const removeUserOrder = (orderId: number) => {
        const index = userOrders.value.findIndex(o => o.id === orderId);
        if (index !== -1) {
            userOrders.value.splice(index, 1);
        }
    };
    const getUserOrders = () => {
        return userOrders.value;
    };
    const clearUserOrders = () => {
        userOrders.value = [];
    };
    return {
        userOrders,
        addUserOrder,
        updateUserOrder,
        removeUserOrder,
        clearUserOrders,
        getUserOrders
    }
})