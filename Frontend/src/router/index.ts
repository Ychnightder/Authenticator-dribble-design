import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import VerifyView from '../views/VerifyView.vue';

const routes = [
	{ path: '/', redirect: '/login' },
	{ path: '/login', name: 'login', component: LoginView },
	{ path: '/register', name: 'register', component: RegisterView },
	{ path: '/verify', name: 'verify', component: VerifyView },
];

export default createRouter({
	history: createWebHistory(),
	routes,
});