<template>
    <div class="max-w-5xl mx-auto">
        <h2 class="text-2xl font-bold text-stone-800 mb-8 text-center">دسته‌بندی منو</h2>

        <div v-if="!menuCategories.length" class="flex justify-center py-16">
            <ProgressSpinner style="width: 50px; height: 50px" />
        </div>

        <div v-else class="categories grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <NuxtLink
                v-for="category in menuCategories"
                :key="category"
                :to="`/category-${category}`"
                class="category-item"
            >
                <div class="h-full flex flex-col items-center justify-center gap-3 rounded-2xl border border-orange-100 bg-white px-4 py-6 shadow-md shadow-orange-200/50 transition-all duration-200 hover:border-orange-300 hover:shadow-lg hover:-translate-y-0.5">
                    <div class="w-12 h-12 flex items-center justify-center rounded-full bg-orange-50">
                        <Tag class="text-orange-500 w-5 h-5" />
                    </div>
                    <span class="font-medium text-stone-800 capitalize">{{ category }}</span>
                </div>
            </NuxtLink>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { getMenuItem } from '~/sevices/getMenuItem.sevices';
import ProgressSpinner from 'primevue/progressspinner';
import Tag from '@primeicons/vue/tag';

const menuCategories = ref<string[]>([]);

const getMenuCategory = async () => {
    const response = await getMenuItem();
    menuCategories.value = Array.from(new Set(response.map(item => item.category)));
};

onMounted(() => {
    getMenuCategory();
});


definePageMeta({
  title: 'Home',
  layout: 'index-page'
})
</script>