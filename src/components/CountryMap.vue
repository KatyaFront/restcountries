<script setup>
import { computed } from 'vue';
import { GoogleMap, Marker } from 'vue3-google-map';
import Button from './Button.vue';
import { useStore } from '../store';

const store = useStore();

const country = computed(() => {
  return store.coordinatesCountries.find(
    (country) => country.name === store.selectedCountryMap
  );
});

const clearCountryMap = () => {
  store.setComponent('Countries');
  store.selectedCountryMap = null;
};
</script>

<template>
  <Button @click.prevent="clearCountryMap()" buttonText="Back to Countries" />
  <GoogleMap
    api-key="AIzaSyAaPPNf2xqKL0k3EWgqD_NPCRDjCGLozmM"
    style="width: 95vw; height: 95vh"
    :center="{
      lat: country.latlng[0],
      lng: country.latlng[1],
    }"
    :zoom="5"
  >
    <Marker
      :options="{
        position: {
          lat: country.latlng[0],
          lng: country.latlng[1],
        },
      }"
    />
  </GoogleMap>
</template>
