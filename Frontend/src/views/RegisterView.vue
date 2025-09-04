  
  <script setup lang="ts">
import Title from "../components/shared/Title.vue"
import AuthForm from "../components/form/AuthForm.vue";

  </script>
<template>
  <div class="bg">

  <Title title="Create an account" text="Enter all your information below to create your account"/>

    <AuthForm
    endpoint="http://localhost:3000/users/register" 
    buttonText="Sign up"

    AlternativeText="Already have an account?" 
    btnAlternativeLink="/login"
    btnAlternativeText="Login"
  />
  
  </div>
</template>

<style scoped>
.bg{
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 450px;
  height: auto;
  background: #fff;
    padding: 0 0  10px 0;

}
</style>
