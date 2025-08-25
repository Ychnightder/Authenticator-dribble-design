<script setup lang="ts">
import { defineProps } from 'vue';

const props  = defineProps<{
  title: string;
  text: string
  ;
}>();
  </script>

<template>
  <div class="wrapper">
    <h1 class="title">{{ title }}</h1>
    <p class="subtitle">{{ text }}</p>
  </div>
</template>

<style scoped >
.wrapper {
  width: 415px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;

}
.title {
  font-size: 24px;
  font-weight: bold;
}
.subtitle {
  text-align: center;
  font-size: 16px;
}


@media screen and (max-width: 400px) {
  .wrapper {
    width: 100%;
    height: 100px;
    flex-direction: column;
  }

  .title {
    font-size: 18px;
    text-align: center;
  }

  .subtitle {
    font-size: 14px;
  }
}


</style>
