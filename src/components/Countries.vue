<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import axios from 'axios';

const countriesData = ref([]);
const emit = defineEmits(['show-country-details']);

onMounted(async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    countriesData.value = response.data;
    console.log(countriesData.value);
  } catch (error) {
    console.error('Error loading data', error);
  }
});

const showCountryDetails = (country) => {
  emit('show-country-details', country);
};
</script>

<template>
  <div class="countries">
    <h1 class="countries__title">Rest countries</h1>
    <ul class="countries__list">
      <li class="countries__item" v-for="item in countriesData" :key="item.id">
        <a
          class="countries__link"
          href="#"
          @click="showCountryDetails(country)"
          >{{ item.name.common }}</a
        >
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
  padding: 15px 15px 30px 15px;
}

.countries__list {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
}

.countries__link {
  transition: color 0.1s ease-in-out, border-bottom 0.1s ease-in-out;
}

.countries__link:hover {
  color: #81a1a9;
  border-bottom: 2px solid #81a1a9;
}
</style>
