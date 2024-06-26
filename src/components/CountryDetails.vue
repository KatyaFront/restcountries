<script setup>
import { defineProps } from 'vue';

import { ref, onMounted } from 'vue';
import axios from 'axios';

const countriesData = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    countriesData.value = response.data;
    console.log(countriesData.value);
  } catch (error) {
    console.error('Error loading data', error);
  }
});

const props = defineProps(['country']);
</script>

<template>
  <div v-for="item in countriesData" :key="item.id">
    <h2>{{ item.name.common }}</h2>
    <p><strong>Capital: </strong>{{ item.capital }}</p>
    <p><strong>Population: </strong>{{ item.population }}</p>
    <p><strong>Area: </strong>{{ item.area }}</p>
  </div>
</template>
