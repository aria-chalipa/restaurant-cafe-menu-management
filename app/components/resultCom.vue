<template>
  <div v-if="totalPrice > 0" class="sticky bottom-4 mt-8 flex items-center justify-between gap-4 rounded-2xl border border-orange-100 bg-white px-5 py-4 shadow-lg shadow-orange-200/50">
    <span class="font-semibold text-stone-800">مجموع: {{ totalPrice.toLocaleString() }} تومان</span>
    <Button
      label="ثبت سفارش"
      :disabled="!cartItems.length || isSubmitting"
      :loading="isSubmitting"
      class="bg-orange-500! border-orange-500! hover:bg-orange-600!"
      @click.prevent="submitOrder"
    />
  </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button';

defineProps<{
  totalPrice: number;
  cartItems: any[];
  isSubmitting: boolean;
  submitOrder: () => void;
}>();
</script>