<script setup>
import { useStore } from '../store';

const store = useStore();
</script>

<template>
  <div class="sort-container">
    <label for="sort">Sorting: </label>
    <select
      class="select dark:bg-gray-500"
      id="sort"
      v-model="store.selectedSortMethod"
    >
      <option class="select__option" value="alphabeticallyA">
        sort alphabetically A-Z
      </option>
      <option class="select__option" value="alphabeticallyZ">
        sort alphabetically Z-A
      </option>
      <option class="select__option" value="populationAsc">
        sort by ascending population
      </option>
      <option class="select__option" value="populationDesc">
        sort by descending population
      </option>
      <option class="select__option" value="areaAsc">
        sort by ascending area
      </option>
      <option class="select__option" value="areaDesc">
        sort by descending area
      </option>
    </select>
  </div>
</template>

<style scoped>
.select {
  margin-top: 5px;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border-radius: 10px;
}

.select__option {
  font-size: 16px;
}
</style>
