<template>
  <div class="max-w-5xl mx-auto px-4 py-10">
    <div class="flex items-center justify-between mb-8">
      <NuxtLink :to="`/menu-${route.params.id}`" class="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors">
        <ArrowRight class="w-4 h-4" />
        <span>بازگشت</span>
      </NuxtLink>
      <h2 class="text-2xl font-bold text-stone-800 capitalize">{{ category }}</h2>
      <span class="w-16"></span>
    </div>

    <div v-if="isLoading" class="flex justify-center py-16">
      <ProgressSpinner style="width: 50px; height: 50px" />
    </div>

    <div v-else-if="!menuItems.length" class="text-center text-stone-500 py-16">
      موردی در این دسته‌بندی یافت نشد.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="item in menuItems"
        :key="item.id"
        class="flex items-center justify-between gap-4 rounded-2xl border border-orange-100 bg-white px-5 py-4 shadow-md shadow-orange-200/50 transition-all duration-200 hover:border-orange-300 hover:shadow-lg"
      >
        <div>
          <h3 class="font-semibold text-stone-800">{{ item.name }}</h3>
          <p class="text-sm text-stone-500 mt-1">{{ item.description }}</p>
        </div>
        <span class="shrink-0 font-bold text-orange-600 whitespace-nowrap">{{ item.price.toLocaleString() }} تومان</span>
        <AddRemoveCom @change="(quantity) => handelChange(item, quantity)"/>
      </div>
    </div>

    <div v-if="menuItems.length" class="sticky bottom-4 mt-8 flex items-center justify-between gap-4 rounded-2xl border border-orange-100 bg-white px-5 py-4 shadow-lg shadow-orange-200/50">
      <span class="font-semibold text-stone-800">مجموع: {{ totalPrice.toLocaleString() }} تومان</span>
      <Button
        label="ثبت سفارش"
        :disabled="!cartItems.length || isSubmitting"
        :loading="isSubmitting"
        class="bg-orange-500! border-orange-500! hover:bg-orange-600!"
        @click.prevent="submitOrder"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserOrders } from '@/store/useUserOrders';
import { useAuthUser } from '@/store/useAuthUser';
import { useToastStore } from '@/store/useToast';
import type { MenuItems } from '~/models/menu/MenuItems';
import { OrderStatus, type UserOrder } from '~/models/users/Orders';
import { getMenuItem } from '~/sevices/getMenuItem.sevices';
import { orders as postOrders } from '~/sevices/orders.services';
import ProgressSpinner from 'primevue/progressspinner';
import Button from 'primevue/button';
import ArrowRight from '@primeicons/vue/arrow-right';
import AddRemoveCom from '~/components/base/add_removeCom.vue';

const route = useRoute();
let category = route.params.category;
const menuItems = ref<MenuItems[]>([]);
const isLoading = ref(true);
const isSubmitting = ref(false);
const quantities = ref<Record<number, number>>({});
const userOrdersStore = useUserOrders();
const authUser = useAuthUser();
const { showToast } = useToastStore();

const getMenuItemsByCategory = async () => {
    isLoading.value = true;
    const response = await getMenuItem();
    menuItems.value = response.filter((item: any) => item.category === category);
    isLoading.value = false;
};

const handelChange = (item: MenuItems, quantity: number) => {
  quantities.value[item.id] = quantity;
};

const cartItems = computed(() => {
  return menuItems.value
    .filter((item) => (quantities.value[item.id] ?? 0) > 0)
    .map((item) => ({
      id: item.id,
      name: item.name,
      quantity: quantities.value[item.id] ?? 0,
      price: item.price,
    }));
});

const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

const submitOrder = async () => {
  if (!cartItems.value.length) return;

  const order: UserOrder = {
    id: route.params.id as string,
    name: authUser.getUser().name ?? '',
    items: cartItems.value.map(item => ({ ...item })),
    totalPrice: totalPrice.value,
    status: OrderStatus.Pending,
    createdAt: new Date(),
  };

  isSubmitting.value = true;
  try {
    await postOrders(order);
    userOrdersStore.addUserOrder(order);
    quantities.value = {};
    showToast('success', 'سفارش ثبت شد', 'سفارش شما با موفقیت ثبت شد', 2000);
  } catch (error) {
    showToast('danger', 'خطا در ثبت سفارش', 'دوباره تلاش کنید', 2000);
  } finally {
    isSubmitting.value = false;
  }
};

watch(() => route.params.category, (newCategory) => {
    category = newCategory;
    getMenuItemsByCategory();
});

onMounted(() => {
    getMenuItemsByCategory();
});

useHead({
  title: () => 'دسته‌بندی ' + category,
});

definePageMeta({
  layout: 'index-page'
})
</script>

<style>

</style>