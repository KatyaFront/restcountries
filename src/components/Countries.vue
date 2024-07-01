<script setup>
import Button from './Button.vue';
import CountryDetails from './CountryDetails.vue';
import { useStore } from '../store';

const emits = defineEmits(['show-country-map']);
const store = useStore();

const showCountryMap = (country) => {
  emits('show-country-map', country);
};
</script>

<template>
  <ul class="list">
    <li
      class="list__item"
      v-for="country in store.sortedCountries"
      :key="country"
    >
      <p>{{ country }}</p>
      <div class="list__buttons">
        <Button
          @click.prevent="store.showCountryDetails(country)"
          buttonText="details"
        />
        <Button @click.prevent="showCountryMap(country)" buttonText="map" />
      </div>

      <CountryDetails v-if="store.selectedCountry === country" />
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
