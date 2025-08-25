<script setup lang="ts">
import { defineProps } from 'vue';


const props = defineProps<{
  text: string
}>()



</script>

<template>
    <button class="btn" type="submit"> {{ text }}</button>
</template>
<style> 
  .btn{
    width: 375px;
    height: 40px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: var(--primary);
    color: #fff ;
    font-size: 15px;
    cursor: pointer;
    transition: opacity 0.3s ease-in;
  }
  .btn:hover{
    background-color: var(--primary);
    opacity: 0.9;
  }

</style>