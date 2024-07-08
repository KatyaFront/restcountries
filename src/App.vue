<script setup>
import { onMounted } from 'vue';
import ToggleMode from './components/ToggleMode.vue';
import Button from './components/Button.vue';
import Countries from './components/Countries.vue';
import CountryMap from './components/CountryMap.vue';
import FavoriteCountries from './components/FavoriteCountries.vue';
import Search from './components/Search.vue';
import { useStore } from './store';

const store = useStore();

onMounted(async () => {
  await store.fetchDataCountries();
});

const showFavoriteCountries = () => {
  store.setComponent('FavoriteCountries');
  store.title = 'Favorite Countries';
};
</script>

<template>
  <div class="app">
    <ToggleMode />
    <h1 class="title">
      {{ store.selectedCountryMap ? store.selectedCountryMap : store.title }}
    </h1>
    <div class="block-countries" v-if="store.currentComponent === 'Countries'">
      <div class="block-buttons-search">
        <div class="block-buttons">
          <Button
            @click.prevent="store.sortСountries()"
            buttonText="sort alphabetically"
          />
          <Button
            buttonText="show favorite"
            @click.prevent="showFavoriteCountries()"
          />
        </div>
        <Search />
      </div>
      <Countries />
    </div>
    <CountryMap v-if="store.currentComponent === 'CountryMap'" />
    <FavoriteCountries v-if="store.currentComponent === 'FavoriteCountries'" />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  margin: 30px 0;
  text-align: center;
  font-size: 36px;
  font-weight: 700;
}

.block-countries {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 50%;
}

.block-buttons-search {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.block-buttons {
  display: flex;
  justify-content: center;
  column-gap: 10px;
}
</style>
