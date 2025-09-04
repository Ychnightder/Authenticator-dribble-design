<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  text: string;
}>();



</script>

<template>
    <div class="line">
    <div class="txt">{{ props.text }}</div>
  </div>
</template>
<style scoped>
  .line{
        width: 305px;
        height: 1px;
        background: #1117297f;
        color:  var(--primary);
        position: relative;
        margin: 15px 0;
        border-radius: 1px;

    }
     .txt{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50% , -50%);
        z-index: 20;
        background: #fff;
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
    } 



</style>