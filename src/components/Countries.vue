<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Button from './Button.vue';
import CountryDetails from './CountryDetails.vue';
import CountryMap from './CountryMap.vue';

const countriesData = ref([]);
const selectedCountryIndex = ref(null);
const selectedCountryMapIndex = ref(null);
let sortDirection = 'asc';

onMounted(async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    countriesData.value = response.data;
  } catch (error) {
    console.error('Error loading data', error);
  }
});

const showCountryDetails = (index) => {
  selectedCountryIndex.value =
    selectedCountryIndex.value === index ? null : index;
};

const showCountryMap = (index) => {
  selectedCountryMapIndex.value =
    selectedCountryMapIndex.value === index ? null : index;
};

const sortСountries = (countries) => {
  countries.sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.name.common.localeCompare(b.name.common);
    } else {
      return b.name.common.localeCompare(a.name.common);
    }
  });
  sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
};
</script>

<template>
  <div class="countries">
    <h1 class="countries__title">Rest countries</h1>
    <Button
      @click="sortСountries(countriesData)"
      buttonText="Sort countries alphabetically"
    />
    <ul class="countries__list">
      <li
        class="countries__item"
        v-for="(item, index) in countriesData"
        :key="index"
      >
        <p>{{ item.name.common }}</p>
        <div class="countries__buttons">
          <Button
            @click.prevent="showCountryDetails(index)"
            buttonText="details"
          />
          <Button @click.prevent="showCountryMap(index)" buttonText="map" />
        </div>

        <CountryDetails v-if="selectedCountryIndex === index" :country="item" />
        <CountryMap v-if="selectedCountryMapIndex === index" :country="item" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.countries {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.countries__title {
  margin-bottom: 30px;
  text-align: center;
  font-size: 36px;
  font-weight: 700;
}

.countries__list {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 15px;
  text-align: center;
}

.countries__item {
  display: flex;
  flex-direction: column;
  column-gap: 15px;
}

.countries__buttons {
  display: flex;
  justify-content: center;
  column-gap: 10px;
}

.countries__link {
  transition: color 0.1s ease-in-out, border-bottom 0.1s ease-in-out;
}

.countries__link:hover {
  color: var(--secondary-text-color);
  border-bottom: 2px solid var(--secondary-text-color);
}

.countries__link-map {
  margin-top: 10px;
  font-size: 14px;
  color: var(--secondary-text-color);
  border-bottom: 1px solid var(--secondary-text-color);
}
</style>
