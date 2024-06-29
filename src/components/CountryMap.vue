<script setup>
import { GoogleMap, Marker } from 'vue3-google-map';

defineProps({
  country: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <GoogleMap
    api-key="AIzaSyAaPPNf2xqKL0k3EWgqD_NPCRDjCGLozmM"
    style="width: 100vw; height: 100vh"
    :center="{ lat: country.latlng[0], lng: country.latlng[1] }"
    :zoom="5"
  >
    <Marker
      :options="{
        position: { lat: country.latlng[0], lng: country.latlng[1] },
      }"
    />
  </GoogleMap>
</template>
