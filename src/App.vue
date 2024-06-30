<script setup>
import { ref, onMounted, provide } from 'vue';
import axios from 'axios';
import ToggleMode from './components/ToggleMode.vue';
import Button from './components/Button.vue';
import Countries from './components/Countries.vue';
import CountryMap from './components/CountryMap.vue';

const title = ref('Rest countries');
const dataCountries = ref([]);
const sortedCountries = ref([]);
const coordinatesCountries = ref([]);
const selectedCountryMap = ref(null);
let sortDirection = 'asc';

onMounted(async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    dataCountries.value = response.data;
    sortedCountries.value = dataCountries.value.map(
      (country) => country.name.common
    );
    coordinatesCountries.value = dataCountries.value.map((country) => {
      return {
        name: country.name.common,
        latlng: country.latlng,
      };
    });
  } catch (error) {
    console.error('Error loading data', error);
  }
});

const sortСountries = (countries) => {
  countries.sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.localeCompare(b);
    } else {
      return b.localeCompare(a);
    }
  });
  sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
};

const renderCountryMap = (country) => {
  selectedCountryMap.value = country;
};

const clearCountryMap = () => {
  selectedCountryMap.value = null;
};

provide('dataCountries', dataCountries);
provide('dataCountriesName', sortedCountries);
provide('dataCountriesMap', coordinatesCountries);
</script>

<template>
  <div class="app">
    <ToggleMode />
    <h1 class="title">{{ title }}</h1>
    <div class="block-countries" v-if="!selectedCountryMap">
      <Button
        @click="sortСountries(sortedCountries)"
        buttonText="Sort countries alphabetically"
      />
      <Countries
        :countries="sortedCountries"
        @show-country-map="renderCountryMap"
      />
    </div>
    <CountryMap
      v-if="selectedCountryMap"
      :countryName="selectedCountryMap"
      @back="clearCountryMap"
    />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  margin-bottom: 30px;
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
