<script setup>
import { useStore } from '../store';

const store = useStore();
</script>

<template>
  <ul class="list" v-if="store.viewedCountries.length !== 0">
    <li
      class="list__item"
      v-for="country in store.viewedCountries"
      :key="country"
    >
      <p>
        {{ country }}
      </p>
    </li>
  </ul>
  <p v-if="store.viewedCountries.length === 0">No viewed countries</p>
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
</style>
