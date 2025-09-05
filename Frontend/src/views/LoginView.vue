<script setup lang="ts">
import Title from "../components/shared/Title.vue"
import AuthForm from "../components/form/AuthForm.vue";
import { ref } from "vue";

const apiUser = ref<string>(import.meta.env.VITE_API_USER);
apiUser.value = apiUser.value + "/login";
</script>

<template>
  <div >
 <Title title="Log in" text="Log in and access your Calendora dashboard"/>
     <AuthForm
    :endpoint="apiUser"
    buttonText="Log in"

    AlternativeText="Don't have an account?"
    btnAlternativeLink="/register"
    btnAlternativeText="Sign up"
  />
  </div>
 
</template>

<style scoped>

</style>
