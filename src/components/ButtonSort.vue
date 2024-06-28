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
  <button
    class="button bg-white dark:bg-gray-500"
    type="button"
    @click="sortСountries()"
  >
    Sort countries alphabetically
  </button>
</template>

<style scoped>
.button {
  margin-bottom: 30px;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid var(--primary-text-color);
  transition: color 0.3s ease-in-out, transform 0.3s;
}

.button:hover {
  color: var(--secondary-text-color);
}

.button:active {
  transform: translateY(-5px);
}
</style>
