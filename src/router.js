import { createRouter, createWebHistory } from 'vue-router';
import Countries from './components/Countries.vue';
import CountryDetails from './components/CountryDetails.vue';

const routes = [
  {
    path: '/',
    name: 'Countries',
    component: Countries,
  },
  {
    path: '/details',
    name: 'CountryDetails',
    component: CountryDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
