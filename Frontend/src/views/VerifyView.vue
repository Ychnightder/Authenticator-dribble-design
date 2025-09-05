<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import CodeInput from "../components/verify/CodeInput.vue";
import Button from "../components/button/Button.vue";
import ImageVerify from "../components/verify/ImageVerify.vue";
import LinkForm from "../components/form/LinkForm.vue";
import ButtonLink from "../components/button/ButtonLink.vue";
import { useRouter } from 'vue-router';
// import { useRoute } from 'vue-router';

const code = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const router = useRouter()
// const route = useRoute();
// const email = ref(route.query.email as string || "");
const email = ref(localStorage.getItem('emailToVerify') || "");
const apiVerify = import.meta.env.VITE_API_USER +"/verify-email"

function onCodeComplete(c: string) {
  code.value = c;
}

async function handleSubmit() {
  errorMessage.value = "";
  successMessage.value = "";

  if (!code.value) {
    errorMessage.value = "Veuillez entrer le code reçu par email.";
    return;
  }

  try {
    const res = await axios.post(apiVerify, { otp: code.value , email : email.value });
    successMessage.value = res.data.message || "Email vérifié avec succès ✅";
    if (res.data.success) {
      localStorage.removeItem('emailToVerify');
    }
     router.push("/Welcome");
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response) {
      errorMessage.value = err.response.data.message || "Code invalide ❌";
    } else {
      errorMessage.value = "Erreur de connexion au serveur";
    }
  }
}




async function resendCode() {
  try {
    const res = await axios.post(import.meta.env.VITE_API_USER + "/sendEmail", { email: email.value });
    successMessage.value = res.data.message || "Code renvoyé ✅";
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response) {
      errorMessage.value = err.response.data.message || "Erreur lors de l'envoi ❌";
    } else {
      errorMessage.value = "Erreur de connexion au serveur";
    }
  }
}

</script>

<template>
  <div class="verify-container">
    <ImageVerify/>
    <h1 class="title">Verify your email address</h1>
    <p>
      We emailed you a six-digit code to {{ email }}. <br> 
      Enter the code below to confirm your email address.
    </p>
    <CodeInput :length="4" @complete="onCodeComplete" />

    <Button text="Verify" @click="handleSubmit" />

    <LinkForm text="You don't got any email?"/>

    <ButtonLink text="Resende code" urlLink="" @click="resendCode" />    
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<style scoped>

.verify-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 475px;
}

.verify-container .title{
  font-size: 32px;
  font-weight: bold;

}

.verify-container p{
  text-align: center;
  margin-bottom: 10px;
}
.error {
  color: red;
  font-size: 14px;
}

.success {
  color: green;
  font-size: 14px;
}
</style>
