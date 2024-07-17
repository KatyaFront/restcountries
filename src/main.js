import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './styles/normalize.css';
import './styles/style.css';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const pinia = createPinia();
const app = createApp(App);

library.add(faStar, faStarRegular, faTimes);

app.use(pinia);
app.use(router);
app.mount('#app');
app.component('font-awesome-icon', FontAwesomeIcon);
