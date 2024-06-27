<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  countries: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['sortCountries']);

const sortСountries = () => {
  const sortedCountries = [...props.countries.value.value];
  sortedCountries.sort((a, b) => a.localeCompare(b));
  emits('sortCountries', sortedCountries);
};
</script>

<template>
  <button class="button" type="button" @click="sortСountries()">
    Sort countries alphabetically
  </button>
</template>

<style scoped>
.button {
  margin-bottom: 30px;
  padding: 10px;
  font-size: 16px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #125365;
  transition: color 0.3s ease-in-out, transform 0.3s;
}

.button:hover {
  color: #81a1a9;
}

.button:active {
  transform: translateY(-5px);
}
</style>
