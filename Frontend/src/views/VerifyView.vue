<template>
  <div>
    <h1>Verify OTP</h1>
    <br /><br />

    <FormField
      v-model="model"
      label="Email"
      type="email"
      placeholder="Email"
      :rules="[
            (v: string) => (v === '' ? null : null), // vide => pas d'erreur
          (v: string) =>
            v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Invalid email' : null,
      ]"
    />
   <br /><br />
    <ButtonLink text="login" urlLink="register" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormField from "../components/form/FormField.vue";
import ButtonLink from "../components/button/ButtonLink.vue";
const model = ref("");

</script>
