<script setup lang="ts">
import { ref , defineProps} from 'vue';
const props = defineProps<{
  label: string
  type: string
  modelValue: string
  placeholder?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emits('update:modelValue', target.value)
}
</script>

<template>
 <label class="label" :for="type">
    <span>{{ label }}</span>
    <input 
        :id="type"
        :type="type" 
        :placeholder="placeholder" 
        :value="modelValue" 
        @input="onInput"
     >
 </label>
</template>

<style scoped>
    .label{
        font-size: 15px;
        display: flex;
        flex-direction: column;
        max-width: 375px;
        gap:9px;
    }
    .label span{
      margin-left: 2px;
    }
   
    .label input{
        width: 375px;
        border: none;
        border-radius: 5px;
        border: 1px solid #ddd;
        outline: unset;
        padding: 13px;
    }
</style>