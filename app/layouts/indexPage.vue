<template>
  <header class="bg-linear-to-r from-orange-500 to-orange-400 px-6 py-4 text-center pt-2">
    <h1>Welcome to My Restaurant</h1>
  </header>
  <main class="px-6 py-4 bg-amber-50 text-stone-800!">
    <slot />
  </main>
  <footer class="bg-linear-to-r from-orange-500 to-orange-400 px-6 py-4 text-center pt-2">
    <p>&copy; 2024 My Restaurant</p>
    <p>All rights reserved.</p>
  </footer>
</template>

<script lang="ts" setup>

</script>

<style>

</style>