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
    <h1 class="title">{{ props.title }}</h1>
    <p class="subtitle">{{ text }}</p>
  </div>
</template>

<style scoped >
.wrapper {
  width: 355px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  color: var(--primary);

}
.title {
  font-size: 32px;
  font-weight: bold;

}
.subtitle {
  text-align: center;
  font-size: 14px;
  letter-spacing: -1px;
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
