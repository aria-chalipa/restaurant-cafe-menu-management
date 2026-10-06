<template>
  <div class="min-h-screen w-full bg-linear-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-6">
    <div class="w-full max-w-sm bg-white rounded-2xl shadow-xl shadow-orange-200/50 border border-orange-100 overflow-hidden">
      <div class="bg-linear-to-r from-orange-500 to-orange-400 px-6 py-8 text-center">
        <h1 class="text-2xl font-bold text-white tracking-wide">منو کافه و رستوران</h1>
        <p class="text-orange-50/90 text-sm mt-1">برای ادامه وارد شوید</p>
      </div>

      <div class="space-y-4 p-6">
        <InputGroup class="rounded-lg! overflow-hidden border border-orange-200 focus-within:border-orange-400 transition-colors">
            <InputGroupAddon class="bg-orange-50! border-none!">
                <User class="text-orange-500 w-4 h-4" />
            </InputGroupAddon>
            <InputText placeholder="نام کاربری" class="border-none! bg-white! focus:shadow-none! text-stone-800!" />
        </InputGroup>

        <InputGroup class="rounded-lg! overflow-hidden border border-orange-200 focus-within:border-orange-400 transition-colors ">
            <InputGroupAddon class="p-0! bg-orange-50! border-none! ">
                <Select v-model="selectedCode" :options="phoneCodes" optionLabel="dial" scrollHeight="auto" class="border-none! shadow-none! bg-transparent! w-24" size="small">
                    <template #value="slotProps">
                        <div class="flex items-center gap-1.5">
                            <img  src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${slotProps.value.code}`" style="width: 18px; height: 12px" />
                            <span class="text-sm text-orange-700 font-medium">{{ slotProps.value.dial }}</span>
                        </div>
                    </template>
                    <template #option="slotProps">
                        <div class="flex items-center gap-2">
                            <img  src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${slotProps.option.code}`" style="width: 18px; height: 12px" />
                            <span class="ml-auto">{{ slotProps.option.dial }}</span>
                        </div>
                    </template>
                </Select>
            </InputGroupAddon>
            <InputText placeholder="شماره تلفن" class="border-none! bg-white! focus:shadow-none! text-stone-800!" type="number" />
        </InputGroup>

        <button class="w-full mt-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-2.5 rounded-lg shadow-md shadow-orange-300/50 transition-colors cursor-pointer">
          ادامه
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import User from '@primeicons/vue/user';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';



const phoneCodes = ref([
    { name: 'IR', code: 'ir', dial: '+98' },
    { name: 'TR', code: 'tr' }
]);
const selectedCode = ref(phoneCodes.value[0]);
</script>

<style>

</style>