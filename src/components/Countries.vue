<script setup>
import { ref } from 'vue';
import Button from './Button.vue';
import CountryDetails from './CountryDetails.vue';

const props = defineProps({
  countries: Array,
  required: true,
});

const selectedCountry = ref(null);
const emits = defineEmits(['show-country-map']);

const showCountryDetails = (country) => {
  selectedCountry.value = selectedCountry.value === country ? null : country;
};

const showCountryMap = (country) => {
  emits('show-country-map', country);
};
</script>

<template>
  <ul class="list">
    <li class="list__item" v-for="country in countries" :key="country">
      <p>{{ country }}</p>
      <div class="list__buttons">
        <Button
          @click.prevent="showCountryDetails(country)"
          buttonText="details"
        />
        <Button @click.prevent="showCountryMap(country)" buttonText="map" />
      </div>

      <CountryDetails
        v-if="selectedCountry === country"
        :countryName="selectedCountry"
      />
    </li>
  </ul>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 15px;
  text-align: center;
}

.list__item {
  display: flex;
  flex-direction: column;
  column-gap: 15px;
}

.list__buttons {
  display: flex;
  justify-content: center;
  column-gap: 10px;
}
</style>
