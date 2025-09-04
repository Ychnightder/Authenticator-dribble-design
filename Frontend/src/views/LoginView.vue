<script setup lang="ts">
import Title from "../components/shared/Title.vue"
import AuthForm from "../components/form/AuthForm.vue";
</script>

<template>
  <div class="bg">
 <Title title="Log in" text="Log in and access your Calendora dashboard"/>
     <AuthForm
    endpoint="http://localhost:3000/users/login"
    buttonText="Log in"

    AlternativeText="Don't have an account?"
    btnAlternativeLink="/register"
    btnAlternativeText="Sign up"
  />
  </div>
 
</template>

<style scoped>
.bg{
    display: flex;
  align-items: center;
  flex-direction: column;
  width: 415px;
  height: auto;
  background: #fff;
  padding: 0 0  10px 0;

}
</style>
