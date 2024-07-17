<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useStore } from '../store';

const store = useStore();

const showCountryDetailsAndAddHistory = (countryName) => {
  store.showCountryDetails(countryName);
  store.setComponent('CountryDetails');
  store.addToHistory(countryName);
  store.setTitle(countryName);
};
</script>

<template>
  <ul class="list">
    <li
      class="list__item"
      v-for="country in store.sortedCountries"
      :key="country.name.common"
    >
      <div class="list__block-link-star">
        <router-link
          to="/details"
          class="list__link"
          @click="showCountryDetailsAndAddHistory(country.name.common)"
        >
          {{ country.name.common }}
        </router-link>
        <font-awesome-icon
          :icon="[country.isFavorite ? 'fas' : 'far', 'star']"
          class="list__icon"
          @click="store.toggleFavorite(country)"
        />
      </div>
    </li>
  </ul>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 30px;
  text-align: center;
}

.list__item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.list__block-link-star {
  display: flex;
  column-gap: 10px;
}

.list__link {
  display: flex;
  align-items: center;
  column-gap: 10px;
  cursor: pointer;
  transition: color 0.3s ease-in-out, transform 0.3s;
}

.list__link:hover {
  color: var(--secondary-text-color);
}

.list__link:active {
  transform: translateY(-5px);
}

.list__icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>
