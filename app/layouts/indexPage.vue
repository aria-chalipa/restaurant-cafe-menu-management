<template>
  <div>
    <header class="bg-linear-to-r from-orange-500 to-orange-400 px-6 py-4  pt-2 flex flex-row-reverse justify-between items-center">
      <div class="text-center flex justify-center">
        <h1>
           نام رستوران
        </h1>
      </div>
      <div class="text-right flex justify-start">
        <p>{{ user.getUser().name }}</p>
      </div>
    </header>
    <main class="px-6 py-4 bg-amber-50 text-stone-800!">
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

const user = useAuthUser()
</script>

