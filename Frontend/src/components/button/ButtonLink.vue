<script setup lang="ts">
const props = defineProps<{
  text: string;
  urlLink : string
}>();

</script>

<template>
    <router-link :to="props.urlLink" class="btn">
    {{ text }}
  </router-link>
</template>

<style scoped>

.btn{
    width: 375px;
    height: 40px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: #fff;
    color: var(--primary) ;
    border: 1px solid #ddd;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.3s ease-in;
    text-decoration: none;
}
.btn:hover{
    background-color: #dddddd55;
}

</style>