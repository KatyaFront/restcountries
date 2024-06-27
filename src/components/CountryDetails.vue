<script setup>
import { defineProps, ref } from 'vue';

defineProps({
  country: {
    type: Object,
    required: true,
  },
});

const showMoreDetails = ref(false);

const addMoreDetails = () => {
  showMoreDetails.value = !showMoreDetails.value;
};
</script>

<template>
  <div class="details">
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
    <!-- подробный детали -->
    <a href="#" class="details__link" @click="addMoreDetails"
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
  margin-top: 5px;
  padding: 10px;
  background-color: #fff;
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
  color: #81a1a9;
  border-bottom: 1px solid #81a1a9;
}
</style>
