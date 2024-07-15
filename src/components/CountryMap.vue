<script setup>
import { computed } from 'vue';
import { GoogleMap, Marker } from 'vue3-google-map';
import { useStore } from '../store';

const store = useStore();

const country = computed(() => {
  return store.countries.find(
    (country) => country.name.common === store.selectedCountryMap
  );
});
</script>

<template>
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
