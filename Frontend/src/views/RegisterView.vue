  
  <script setup lang="ts">
import Title from "../components/shared/Title.vue"
import AuthForm from "../components/form/AuthForm.vue";
import { ref } from "vue";

const apiUser = ref<string>(import.meta.env.VITE_API_USER);
apiUser.value = apiUser.value + "/register";

  </script>
<template>
  <div >

  <Title title="Create an account" text="Enter all your information below to create your account"/>

    <AuthForm
    :endpoint= "apiUser" 
    buttonText="Sign up"

    AlternativeText="Already have an account?" 
    btnAlternativeLink="/login"
    btnAlternativeText="Login"
  />
  
  </div>
</template>

<style scoped>


</style>
