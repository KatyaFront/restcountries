<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useStore } from './store';
import ToggleMode from './components/ToggleMode.vue';
import Button from './components/Button.vue';
import FavoriteCountries from './components/FavoriteCountries.vue';
import ViewedCountries from './components/ViewedCountries.vue';
import Search from './components/Search.vue';
import Sorting from './components/Sorting.vue';

const store = useStore();

onMounted(async () => {
  await store.fetchDataCountries();
});

const showCountries = () => {
  store.setComponent('Countries');
  store.setTitle('Rest countries');
};

const showFavoriteCountries = () => {
  store.setComponent('FavoriteCountries');
  store.setTitle('Favorite Countries');
};

const showViewedCountries = () => {
  store.loadingHistory();
  store.setComponent('ViewedCountries');
  store.setTitle('Viewed Countries');
};
</script>

<template>
  <div class="app">
    <ToggleMode />
    <h1 class="title">
      {{ store.title }}
    </h1>
    <RouterLink
      v-if="store.currentComponent !== 'Countries'"
      to="/"
      @click="showCountries()"
      class="link"
      >Back to Countries</RouterLink
    >
    <div
      v-if="store.currentComponent === 'Countries'"
      class="block-buttons-search-sort"
    >
      <div class="block-buttons">
        <Button
          buttonText="show favorite"
          @click.prevent="showFavoriteCountries()"
        />
        <Button
          buttonText="viewed countries"
          @click.prevent="showViewedCountries()"
        />
      </div>
      <Sorting />
      <Search />
    </div>
    <RouterView />
    <FavoriteCountries v-if="store.currentComponent === 'FavoriteCountries'" />
    <ViewedCountries v-if="store.currentComponent === 'ViewedCountries'" />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 30px;
}

.title {
  margin-top: 30px;
  text-align: center;
  font-size: 36px;
  font-weight: 700;
}

.link {
  color: var(--secondary-text-color);
  text-decoration: underline;
  transition: color 0.3s ease-in-out, transform 0.3s;
}

.link:hover {
  color: var(--tertiary-text-color);
}

.link:active {
  transform: translateY(-5px);
}

.block-buttons-search-sort {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
}

.block-buttons {
  display: flex;
  justify-content: center;
  column-gap: 10px;
}
</style>
