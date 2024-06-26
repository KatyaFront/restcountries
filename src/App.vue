<script setup>
import { ref } from 'vue';
import Countries from './components/Countries.vue';
import CountryDetails from './components/CountryDetails.vue';

const currentComponent = ref('Countries');

const showCountryDetails = (country) => {
  selectedCountry.value = country;
  currentComponent.value = 'CountryDetails';
};

const selectedCountry = ref(null);
</script>

<template>
  <div class="app">
    <component :is="currentComponent">
      <Countries
        v-if="currentComponent === 'Countries'"
        @show-country-details="showCountryDetails"
      />
      <CountryDetails
        v-else-if="currentComponent === 'CountryDetails'"
        :country="selectedCountry"
      />
    </component>
  </div>
</template>
