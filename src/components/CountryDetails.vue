<script setup>
import { defineProps } from 'vue';

defineProps({
  country: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="details">
    <img
      class="details__img"
      :src="country.flags.png"
      :alt="country.name.common"
    />
    <p class="details__desc">
      <strong>Capital: </strong>{{ country.capital[0] }}
    </p>
    <p class="details__desc">
      <strong>Population: </strong>{{ country.population }}
    </p>
    <p class="details__desc"><strong>Area: </strong>{{ country.area }}</p>
    <p class="details__desc"><strong>Region:</strong> {{ country.region }}</p>
    <p class="details__desc">
      <strong>Subregion:</strong> {{ country.subregion }}
    </p>
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
</style>
