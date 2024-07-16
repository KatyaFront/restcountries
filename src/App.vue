<script setup>
import { onMounted } from 'vue';
import { useStore } from './store';
import ToggleMode from './components/ToggleMode.vue';
import Button from './components/Button.vue';
import Countries from './components/Countries.vue';
import CountryMap from './components/CountryMap.vue';
import FavoriteCountries from './components/FavoriteCountries.vue';
import ViewedCountries from './components/ViewedCountries.vue';
import Search from './components/Search.vue';
import Sorting from './components/Sorting.vue';

const store = useStore();

onMounted(async () => {
  await store.fetchDataCountries();
});

const showFavoriteCountries = () => {
  store.setComponent('FavoriteCountries');
  store.title = 'Favorite Countries';
};

const showViewedCountries = () => {
  store.loadingHistory();
  store.setComponent('ViewedCountries');
  store.title = 'Viewed Countries';
};
</script>

<template>
  <div class="app">
    <ToggleMode />
    <h1 class="title">
      {{ store.selectedCountryMap ? store.selectedCountryMap : store.title }}
    </h1>
    <Button
      v-if="store.currentComponent !== 'Countries'"
      @click.prevent="store.backCountries()"
      buttonText="Back to Countries"
    />
    <div class="block-countries" v-if="store.currentComponent === 'Countries'">
      <div class="block-buttons-search">
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
      <Countries />
    </div>
    <CountryMap v-if="store.currentComponent === 'CountryMap'" />
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
  row-gap: 30px;
}

.block-buttons {
  display: flex;
  justify-content: center;
  column-gap: 10px;
}
</style>
