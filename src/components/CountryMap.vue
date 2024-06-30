<script setup>
import { inject, computed } from 'vue';
import { GoogleMap, Marker } from 'vue3-google-map';
import Button from './Button.vue';

const props = defineProps({
  countryName: String,
  required: true,
});

const coordinatesCountry = inject('dataCountriesMap');
const emits = defineEmits(['back']);

const country = computed(() => {
  return coordinatesCountry.value.find(
    (country) => country.name === props.countryName
  );
});

const back = () => {
  emits('back');
};
</script>

<template>
  <Button @click.prevent="back" buttonText="Back to Countries" />

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
