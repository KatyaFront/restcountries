<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import CountryDetails from './CountryDetails.vue';

const countriesData = ref([]);
const selectedCountryIndex = ref(null);
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

const sortСountries = (countries) => {
  countries.sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.name.common.localeCompare(b.name.common);
    } else {
      return b.name.common.localeCompare(a.name.common);
    }
  });
  sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  console.log(countriesData.value);
};
</script>

<template>
  <div class="countries">
    <h1 class="countries__title">Rest countries</h1>
    <button
      class="button bg-white dark:bg-gray-500 dark:border-gray-200"
      type="button"
      @click="sortСountries(countriesData)"
    >
      Sort countries alphabetically
    </button>
    <ul class="countries__list">
      <li
        class="countries__item"
        v-for="(item, index) in countriesData"
        :key="index"
      >
        <a
          class="countries__link"
          href="#"
          @click.prevent="showCountryDetails(index)"
          >{{ item.name.common }}</a
        >
        <CountryDetails v-if="selectedCountryIndex === index" :country="item" />
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

.button {
  margin-bottom: 30px;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid;
  transition: color 0.3s ease-in-out, transform 0.3s;
}

.button:hover {
  color: var(--secondary-text-color);
}

.button:active {
  transform: translateY(-5px);
}

.countries__list {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 15px;
  text-align: center;
}

.countries__link {
  transition: color 0.1s ease-in-out, border-bottom 0.1s ease-in-out;
}

.countries__link:hover {
  color: var(--secondary-text-color);
  border-bottom: 2px solid var(--secondary-text-color);
}
</style>
