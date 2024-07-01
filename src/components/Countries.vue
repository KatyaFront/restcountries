<script setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import Button from './Button.vue';
import CountryDetails from './CountryDetails.vue';
import { useStore } from '../store';

library.add(faStar, faStarRegular);

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
      <p class="list__desc">
        {{ country.name }}
        <font-awesome-icon
          :icon="[country.isFavorite ? 'fas' : 'far', 'star']"
          class="list__icon"
          @click="store.toggleFavorite(country)"
        />
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

.list__desc {
  display: flex;
  align-items: center;
  column-gap: 10px;
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
