<template>
    <div>
        <h1>User Orders</h1>
        <!-- <ul>
            <li v-for="order in userOrders" :key="order?.id">
                <h2>{{ order?.name }}</h2>
                <p>Total Price: {{ order?.totalPrice }}</p>
                <p>Created At: {{ order?.createdAt }}</p>
                <ul>
                    <li v-for="item in order?.items" :key="item.id">
                        {{ item?.name }} - Quantity: {{ item?.quantity }} - Price: {{ item?.price }}
                    </li>
                </ul>
            </li>
        </ul> -->
    </div>
</template>

<script setup lang="ts">
import { useUserOrders } from '@/store/useUserOrders';

const { userOrders, addUserOrder, clearUserOrders } = useUserOrders();
</script>