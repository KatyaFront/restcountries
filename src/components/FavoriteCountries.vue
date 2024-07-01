<script setup>
import Button from './Button.vue';
import { useStore } from '../store';

const store = useStore();

const backCountries = () => {
  store.setComponent('Countries');
  store.title = 'Rest countries';
};
</script>

<template>
  <Button @click.prevent="backCountries()" buttonText="Back to Countries" />
  <ul class="list">
    <li
      class="list__item"
      v-for="country in store.favoriteCountries"
      :key="country"
    >
      <p>
        {{ country }}
      </p>
    </li>
  </ul>
  <p v-if="store.favoriteCountries.length === 0">No favorite countries</p>
</template>

<style scoped>
.title {
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 700;
}

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
