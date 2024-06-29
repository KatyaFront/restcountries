<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

defineProps({
  country: {
    type: Object,
    required: true,
  },
});

const showMoreDetails = ref(false);
const containerMoreDetails = ref(null);

const addMoreDetails = () => {
  showMoreDetails.value = !showMoreDetails.value;
};

const handleClickOutside = (event) => {
  if (
    containerMoreDetails.value &&
    !containerMoreDetails.value.contains(event.target)
  ) {
    showMoreDetails.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="details bg-white dark:bg-gray-500" ref="containerMoreDetails">
    <img
      class="details__img"
      :src="country.flags.png"
      :alt="country.name.common"
    />
    <p class="details__desc">
      <strong>Capital: </strong>{{ country.capital.join(', ') }}
    </p>
    <p class="details__desc">
      <strong>Population: </strong>{{ country.population }}
    </p>
    <p class="details__desc"><strong>Area: </strong>{{ country.area }}</p>
    <p class="details__desc"><strong>Region:</strong> {{ country.region }}</p>
    <p class="details__desc">
      <strong>Subregion:</strong> {{ country.subregion }}
    </p>
    <a href="#" class="details__link" @click.prevent="addMoreDetails"
      >detailed information about the country</a
    >
    <div class="details" v-if="showMoreDetails">
      <p class="details__desc">
        <strong>Languages: </strong
        >{{ Object.values(country.languages).join(', ') }}
      </p>
      <p class="details__desc">
        <strong>Population: </strong>{{ country.population }}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  max-width: 30vw;
  margin: 0 auto;
  margin-top: 5px;
  padding: 15px;
  border-radius: 10px;
}

.details__desc {
  font-size: 16px;
}

.details__img {
  width: 120px;
  height: 80px;
}

.details__link {
  margin-top: 10px;
  font-size: 14px;
  color: var(--secondary-text-color);
  border-bottom: 1px solid var(--secondary-text-color);
}
</style>
