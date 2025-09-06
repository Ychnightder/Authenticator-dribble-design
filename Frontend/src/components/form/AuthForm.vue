<script setup lang="ts">
  import { ref, reactive, defineProps } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import FormField from './FormField.vue';
  import LinkForm from './LinkForm.vue';
  import Button from '../button/Button.vue';
  import ButtonLink from '../button/ButtonLink.vue';


  const props = defineProps<{
    endpoint: string;
    buttonText: string;
    AlternativeText: string;
    btnAlternativeText: string;
    btnAlternativeLink: string;

  }>();
  const router = useRouter()
  const isRegister = ref(props.endpoint.includes("register"));

 const emailRules = [
  (v: string) => (!v ? "Email is required" : null), // 🔥 required
  (v: string) => (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Invalid email" : null), // regex seulement si non vide
];

const passwordRules = [
  (v: string) => (!v ? "Password is required" : null), // 🔥 required
  (v: string) => {
    if (!v) return null; // si vide, ne pas valider ici (la règle required gère déjà)
    if (!isRegister.value) return null;
    if (v.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(v)) return "Password must contain an uppercase letter";
    if (!/[0-9]/.test(v)) return "Password must contain a number";
    return null;
  },
];

  const fields = [
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Email', required: false, rule: emailRules },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Password', required: false, rule: passwordRules }
  ];
  const formData = reactive<{ [key: string]: string; }>({});
  fields.forEach(f => (formData[f.name] = ''));

  const errors = reactive<{ [key: string]: string | null }>({});

  const serverErrors = reactive<{ [key: string]: string | null  }>({
    email: null,
    password: null
  });

  async function handleSubmit() {
    let valid = true;
        // Validation des règles
    for (const field of fields) {
      const value = formData[field.name];
      errors[field.name] = null; // reset

      if (field.rule) {
        for (const rule of field.rule) {
          const error = rule(value);
          if (error) {
            errors[field.name] = error;
            valid = false;
            break; // stop dès la première erreur
          }
        }
      }
    }
    if (!valid) return;
    try {
      // console.log(formData)
      const response = await axios.post(props.endpoint, formData);
      // Exemple : si inscription, rediriger vers la vérification
      if (isRegister.value && response) {
        localStorage.setItem('emailToVerify', formData.email);
        router.push("/verify");
      } else {
        router.push("/Welcome"); // ou autre page
      }
    } catch (error: any) {
       console.error("❌ API error:", error.response?.data || error.message);

      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message;

        if (msg === "Utilisateur introuvable") {
          serverErrors.email = "This email does not exist";
        }
        if (msg === "Mot de passe incorrect") {
          serverErrors.password = "Incorrect password";
        }
        if (msg === "Email non vérifié. Vérifiez votre boîte mail.") {
          localStorage.setItem('emailToVerify', formData.email);
          router.push("/verify");
        }
        // -----------

         if (msg === "Utilisateur déjà existant") {
          serverErrors.email = "This email already exists ";
        }

      }


    }
  }

</script>

<template>
  <form @submit.prevent="handleSubmit" class="auth-form">

    <div v-for="field in fields" :key="field.name">
      <FormField v-model="formData[field.name]" 
      :label="field.label" 
      :type="field.type" 
      :placeholder="field.placeholder" 
      :ServerError="!!serverErrors[field.name]"
      @serverMessage="val => serverErrors[field.name] = val"
      :rules="field.rule" 
      :serverMessage="serverErrors[field.name]"  />
    </div>
    <Button :text="buttonText" />
    <p class="text-register" v-if="isRegister">By clicking continuer you agree to our Terms ot Service <br></br>
      and Privacy Policy.</p>
    <LinkForm :text="AlternativeText" />
    <ButtonLink :text="btnAlternativeText" :urlLink="btnAlternativeLink" />
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

  .text-register {
    color: #5e5f66;
    font-size: 14px;
    width: 100%;
    opacity: 0.7;
  }


</style>