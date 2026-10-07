<template>
    <div class="max-w-5xl mx-auto px-4 py-10">
        <h2 class="text-2xl font-bold text-stone-800 mb-8 text-center">دسته‌بندی منو</h2>

        <div v-if="!menuCategories.length" class="flex justify-center py-10">
            <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="4" />
        </div>

        <div v-else class="categories grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <NuxtLink
                v-for="category in menuCategories"
                :key="category"
                :to="`/items/${category}`"
                class="category-item"
            >
                <div class="h-full flex flex-col items-center justify-center gap-2 rounded-2xl border border-orange-100 bg-white px-4 py-6 shadow-md shadow-orange-200/50 transition-all duration-200 hover:border-orange-300 hover:shadow-lg">
                    <TagIcon class="w-6 h-6 text-orange-500" />
                    <span class="font-medium text-stone-800 capitalize">{{ category }}</span>
                </div>
            </NuxtLink>
        </div>
    </div>

</template>

<script lang="ts" setup>
import type { MenuItems } from '~/models/menu/menuItems';
import { getMenuItem } from '~/sevices/getMenuItem.sevices';
import TagIcon from '@primeicons/vue/tag';
import ProgressSpinner from 'primevue/progressspinner';

const menuItems = ref<MenuItems[]>([]);
const menuCategories = ref<string[]>([]);

const getMenu = async () => {
    const response = await getMenuItem();
    console.log(response);
    menuItems.value = response;
    menuCategories.value = Array.from(new Set(response.map(item => item.category)));
};

onMounted(() => {
    getMenu();
});


definePageMeta({
  title: 'Home',
  layout: 'index-page'
})
</script>