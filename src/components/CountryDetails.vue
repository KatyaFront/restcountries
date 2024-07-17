<script setup>
import { computed } from 'vue';
import { useStore } from '../store';
import Button from './Button.vue';

const store = useStore();

const country = computed(() => {
  return store.filteredCountries.find(
    (country) => country.name.common === store.selectedCountry
  );
});

const showCountryMap = (countryName) => {
  store.renderCountryMap(countryName);
  store.setComponent('CountryMap');
  store.setTitle(countryName);
};
</script>

<template>
  <div class="details" ref="containerMoreDetails">
    <img
      class="details__img border-slate-500 dark:border-white"
      :src="country.flags.png"
      :alt="country.name.common"
    />
    <Button
      @click.prevent="showCountryMap(country.name.common)"
      buttonText="map"
    />
    <p class="details__desc">
      <strong>Capital: </strong>{{ country.capital?.join(', ') }}
    </p>
    <p class="details__desc">
      <strong>Population: </strong>{{ country.population }}
    </p>
    <p class="details__desc"><strong>Area: </strong>{{ country.area }}</p>
    <p class="details__desc"><strong>Region:</strong> {{ country.region }}</p>
    <p class="details__desc">
      <strong>Subregion:</strong> {{ country.subregion }}
    </p>
    <a href="#" class="details__link" @click.prevent="store.addMoreDetails()"
      >detailed information about the country</a
    >
    <div class="details__more" v-if="store.showMoreDetails">
      <p class="details__desc">
        <strong>Languages: </strong
        >{{ Object.values(country.languages).join(', ') }}
      </p>
      <p class="details__desc">
        <strong>Timezones: </strong>{{ country.timezones.join(', ') }}
      </p>
      <p class="details__desc">
        <strong>Continents:</strong> {{ country.continents.join(', ') }}
      </p>
      <p class="details__desc">
        <strong>Latlng:</strong> {{ country.latlng.join(', ') }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.details {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  max-width: 80vw;
  margin: 0 auto;
}

.details__more {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  padding: 0;
}

.details__desc {
  text-align: center;
  font-size: 16px;
}

.details__img {
  width: 200px;
  height: 120px;
  border: 1px solid;
}

.details__link {
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  color: var(--secondary-text-color);
  text-decoration: underline;
  transition: color 0.3s ease-in-out, transform 0.3s;
}

.details__link:hover {
  color: var(--tertiary-text-color);
}

.details__link:active {
  transform: translateY(-5px);
}
</style>
