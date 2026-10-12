<template>
  <div class="max-w-5xl mx-auto px-4 py-10">
    <!-- Not logged in: invite the guest to sign in before browsing the menu -->
    <div
      v-if="!isLoggedIn"
      class="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-xl shadow-orange-200/50 border border-orange-100 overflow-hidden text-center"
    >
      <div class="bg-linear-to-r from-orange-500 to-orange-400 px-6 py-10">
        <Shop class="w-12 h-12 text-white mx-auto mb-3" />
        <h1 class="text-2xl font-bold text-white tracking-wide">منو کافه و رستوران</h1>
        <p class="text-orange-50/90 text-sm mt-2">برای مشاهده منو ابتدا وارد شوید</p>
      </div>
      <div class="p-6">
        <NuxtLink
          to="/auth"
          class="inline-flex w-full justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-2.5 rounded-lg shadow-md shadow-orange-300/50 transition-colors"
        >
          ورود برای مشاهده منو
        </NuxtLink>
      </div>
    </div>

    <!-- Logged in: greet the user and let them pick a menu category -->
    <div v-else>
      <div class="text-center mb-10">
        <h1 class="text-2xl font-bold text-stone-800">خوش آمدید{{ name ? '، ' + name : '' }}</h1>
        <p class="text-stone-500 mt-1">یکی از دسته‌بندی‌های زیر را برای مشاهده منو انتخاب کنید</p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <NuxtLink
          v-for="cat in categories"
          :key="cat.value"
          :to="`/category-${cat.value}`"
          class="flex flex-col items-center justify-center gap-2 rounded-2xl border border-orange-100 bg-white px-4 py-6 shadow-md shadow-orange-200/50 transition-all duration-200 hover:border-orange-300 hover:shadow-lg"
        >
          <span class="font-semibold text-stone-800">{{ cat.label }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import Shop from '@primeicons/vue/shop';
import { Category } from '~/models/menu/MenuItems';
import { useAuthUser } from '~/store/useAuthUser';

const { name, isLoggedIn } = storeToRefs(useAuthUser());

const categoryLabels: Record<Category, string> = {
  [Category.COFFEE]: 'قهوه',
  [Category.TEA]: 'چای',
  [Category.ICED_COFFEE]: 'قهوه سرد',
  [Category.ICED_TEA]: 'چای سرد',
  [Category.MOCTEL]: 'موکتل',
  [Category.HOT_DRINK]: 'نوشیدنی گرم',
  [Category.FOOD]: 'غذا',
  [Category.CAKE]: 'کیک',
};

const categories = Object.values(Category).map((value) => ({
  value,
  label: categoryLabels[value],
}));

useHead({
  title: 'منو کافه و رستوران',
});

definePageMeta({
  layout: 'index-page',
});
</script>

<style>

</style>