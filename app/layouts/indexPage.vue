<template>
  <div>
    <header class="bg-linear-to-r from-orange-500 to-orange-400 px-6 py-4  pt-2 flex flex-row-reverse justify-between items-center">
      <div class="text-center flex justify-center">
        <cart-minus v-if="userOrders" :size="24"></cart-minus>
        <cart-plus v-else :size="24" class="text-green-500"></cart-plus>
        
      </div>
      <div class="text-right flex justify-start">
        <p>{{ user.getUser().name }}</p>
      </div>
    </header>
    <main class="px-6 py-4 bg-amber-50 text-stone-800!">
      {{ userOrders }}
      <slot />
    </main>
    <footer class="bg-linear-to-r from-orange-500 to-orange-400 px-6 py-4 text-center pt-2">
      <p>&copy; 2024</p>
      <p>تمامی حقوق محفوظ است.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAuthUser } from '~/store/useAuthUser';
import CartMinus from '@primeicons/vue/cart-minus';
import { useUserOrders } from '~/store/useUserOrders';
import CartPlus from '@primeicons/vue/cart-plus';

const { userOrders } = useUserOrders()

const user = useAuthUser()
</script>

