<template>
  <div class="max-w-5xl mx-auto px-4 py-10">
    <div class="flex items-center justify-between mb-8">
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors">
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
        <AddRemoveCom @change="handelChange"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserOrders } from '@/store/useUserOrders';
import type { MenuItems } from '~/models/menu/MenuItems';
import { getMenuItem } from '~/sevices/getMenuItem.sevices';
import ProgressSpinner from 'primevue/progressspinner';
import ArrowRight from '@primeicons/vue/arrow-right';
import AddRemoveCom from '~/components/base/add_removeCom.vue';

const route = useRoute();
let category = route.params.category;
const menuItems = ref<MenuItems[]>([]);
const isLoading = ref(true);
const userOrdersStore = useUserOrders();

const getMenuItemsByCategory = async () => {
    isLoading.value = true;
    const response = await getMenuItem();
    menuItems.value = response.filter((item: any) => item.category === category);
    isLoading.value = false;
};

const handelChange = (quantity: number) => {
  return quantity;
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