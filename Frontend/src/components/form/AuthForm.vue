<script setup lang="ts">
import { ref , reactive , defineProps } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import FormField from './FormField.vue';
import Button from '../button/Button.vue';


  
const props = defineProps<{
  endpoint: string
  buttonText: string

}>()
const router = useRouter()

const emailRules = [
  (v : string) => {
    if (!v) return null; // vide = pas d'erreur
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(v) ? null : "Email invalide";
  },
];

const isRegister = ref(props.endpoint.includes("register"));

const passwordRule = (v: string) => {
  if (!v) return null; // vide = pas d'erreur
  if (!isRegister.value) return null; // règle stricte uniquement pour l'inscription
  if (v.length < 6) return "Le mot de passe doit contenir au moins 6 caractères";
  if (!/[A-Z]/.test(v)) return "Le mot de passe doit contenir une majuscule";
  if (!/[0-9]/.test(v)) return "Le mot de passe doit contenir un chiffre";
  return null;
};


const fields = [
  { name: 'email', label: 'Email', type: 'email', placeholder: 'Email', required: false , rule : emailRules },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Password', required: false , rule : [passwordRule] }
]


const formData = reactive<{ [key: string]: string }>({})
fields.forEach(f => (formData[f.name] = ''))





async function handleSubmit() {

}


</script>

<template>
 <form @submit.prevent="handleSubmit" class="auth-form">

    <div v-for="field in fields" :key="field.name">
      <FormField
        v-model="formData[field.name]"
        :label="field.label"
        :type="field.type"
        :placeholder="field.placeholder"
        :rules="field.rule"
      />
    </div>

    <Button :text="buttonText" />

  </form>
</template>
<style scoped>
  .auth-form {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}



</style>