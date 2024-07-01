<script setup>
import '@fortawesome/fontawesome-free/css/all.css';
import Button from './Button.vue';
import CountryDetails from './CountryDetails.vue';
import { useStore } from '../store';

const store = useStore();

const showCountryMap = (country) => {
  store.renderCountryMap(country);
  store.setComponent('CountryMap');
};
</script>

<template>
  <ul class="list">
    <li
      class="list__item"
      v-for="country in store.sortedCountries"
      :key="country.name"
    >
      <p>
        {{ country.name }}
        <i
          :class="[
            'fa list__icon',
            country.isFavorite ? 'fa-star' : 'fa-star-o',
          ]"
          @click="store.toggleFavorite(country)"
        ></i>
      </p>
      <div class="list__buttons">
        <Button
          @click.prevent="store.showCountryDetails(country.name)"
          buttonText="details"
        />
        <Button
          @click.prevent="showCountryMap(country.name)"
          buttonText="map"
        />
      </div>
      <CountryDetails v-if="store.selectedCountry === country.name" />
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
  gap: 15px;
}

.list__icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.list__buttons {
  display: flex;
  justify-content: center;
  column-gap: 10px;
}
</style>
