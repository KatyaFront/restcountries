<script setup>
import { onMounted, computed } from 'vue';
import ToggleMode from './components/ToggleMode.vue';
import Button from './components/Button.vue';
import Countries from './components/Countries.vue';
import CountryMap from './components/CountryMap.vue';
import { useStore } from './store';

const store = useStore();

onMounted(async () => {
  await store.fetchDataCountries();
});
</script>

<template>
  <div class="app">
    <ToggleMode />
    <h1 class="title">
      {{ store.selectedCountryMap ? store.selectedCountryMap : store.title }}
    </h1>
    <div class="block-countries" v-if="!store.selectedCountryMap">
      <Button
        @click.prevent="store.sortСountries()"
        buttonText="Sort countries alphabetically"
      />
      <Countries @show-country-map="store.renderCountryMap" />
    </div>
    <CountryMap v-if="store.selectedCountryMap" @back="store.clearCountryMap" />
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
}
</style>
