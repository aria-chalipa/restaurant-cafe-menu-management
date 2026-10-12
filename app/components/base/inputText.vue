<template>
  <div>
    <div>
      <FloatLabel variant = "on" class="bg-white! border-none!">
        <InputText 
            @blur="(e) => handleBlur(e)"  
            @change="(e) => handleChange(e)" 
            v-model="model" 
            :invalid="meta.valid == false" 
            :name="name" 
            :placeholder="lable ? undefined : placeholder" 
            :id="id" 
            class="bg-white! border-none! focus:shadow-none! focus:ring-0! focus:border-none! focus:outline-none! text-stone-800!"
            :type="type"
        /> 
        <label :for="id" v-if="lable">{{ lable }}</label>
      </FloatLabel>
      <p v-if="meta.touched  && errorMessage" class="text-red-600">{{ errorMessage }}</p>
    </div>
    
  </div>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate';
import InputText from 'primevue/inputtext'
import { FloatLabel } from 'primevue';


const id = useId()

const model = defineModel({
  type : String,
  required : false
})
const { name, lable = null, placeholder = '', type = 'text'} = defineProps<{
  name : string,
  lable ?: string,
  placeholder ?: string,
  type ?: string
}>()

const {errorMessage, meta, handleChange, handleBlur, setValue} = useField(name, undefined,{
  initialValue: model.value ?? ''

})

watch(model, () => {
  setValue(model.value ?? '')
})
</script>


<style>

</style>