<script setup>
import { useStore } from '../store';

const store = useStore();
</script>

<template>
  <input
    class="search border-slate-500 dark:border-white"
    v-model="store.searchQuery"
    type="text"
    placeholder="country search"
  />
</template>

<style scoped>
.search {
  margin-bottom: 30px;
  padding: 10px;
  padding-left: 2em;
  width: 100%;
  font-size: 16px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2381a1a9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>')
    no-repeat;
  background-size: 1em;
  background-position: 0.5em center;
  border-radius: 10px;
  outline: 1px solid;
}
</style>
