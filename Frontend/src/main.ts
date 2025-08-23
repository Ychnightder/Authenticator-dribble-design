import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index'; // ✅ Import ton fichier router
import './style/main.css';

const app = createApp(App); // ✅ Crée l'instance
app.use(router); // ✅ Ajoute le router
app.mount('#app');
