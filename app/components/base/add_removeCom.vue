<template>
  <div class="shrink-0 flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-1.5 py-1">
    <Button
      text
      rounded
      class="w-7! h-7! text-orange-600! hover:bg-orange-100!"
      @click="handelNumber('remove')"
    >
      <Minus class="w-3.5 h-3.5" />
    </Button>
    <span class="w-5 text-center font-semibold text-stone-800">{{ number }}</span>
    <Button
      text
      rounded
      class="w-7! h-7! text-orange-600! hover:bg-orange-100!"
      @click="handelNumber('add')"
    >
      <Plus class="w-3.5 h-3.5" />
    </Button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Plus from '@primeicons/vue/plus';
import Minus from '@primeicons/vue/minus';
import Button from 'primevue/button';

const emit = defineEmits<{
  (e: 'change', value: number): void
}>(); 

const number = ref(0);
const handelNumber = (type: 'add' | 'remove') => {
  if (type === 'add') {
    number.value++;
  } else if (type === 'remove') {
    if (number.value > 0) {
      number.value--;
    }
  }
  emit('change', number.value);
}
</script>