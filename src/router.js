import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from './store';
import Countries from './components/Countries.vue';
import CountryDetails from './components/CountryDetails.vue';
import CountryMap from './components/CountryMap.vue';
import FavoriteCountries from './components/FavoriteCountries.vue';
import ViewedCountries from './components/ViewedCountries.vue';

const routes = [
  {
    path: '/',
    name: 'Countries',
    component: Countries,
  },
  {
    path: '/details/:name',
    name: 'CountryDetails',
    component: CountryDetails,
  },
  {
    path: '/map',
    name: 'CountryMap',
    component: CountryMap,
  },
  {
    path: '/favorite',
    name: 'FavoriteCountries',
    component: FavoriteCountries,
  },
  {
    path: '/viewed',
    name: 'ViewedCountries',
    component: ViewedCountries,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  if (to.name === 'CountryDetails') {
    store.setComponent('CountryDetails');
  } else if (to.name === 'CountryMap') {
    store.setComponent('CountryMap');
  } else {
    store.setComponent('Countries');
    store.setTitle('Rest countries');
  }
  next();
});

export default router;
