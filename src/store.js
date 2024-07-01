import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore('store', {
  state: () => ({
    mode: 'light',
    title: 'Rest countries',
    dataCountries: [],
    sortedCountries: [],
    sortDirection: 'asc',
    coordinatesCountries: [],
    selectedCountry: null,
    selectedCountryMap: null,
  }),
  actions: {
    toggleMode() {
      this.mode = this.mode === 'light' ? 'dark' : 'light';
    },
    setTitle(newTitle) {
      this.title = newTitle;
    },
    sortСountries() {
      this.sortedCountries.sort((a, b) => {
        if (this.sortDirection === 'asc') {
          return a.localeCompare(b);
        } else {
          return b.localeCompare(a);
        }
      });
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    },
    showCountryDetails(country) {
      this.selectedCountry = this.selectedCountry === country ? null : country;
    },
    renderCountryMap(country) {
      this.selectedCountryMap = country;
    },
    clearCountryMap() {
      this.selectedCountryMap = null;
    },
    async fetchDataCountries() {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        this.dataCountries = response.data;
        this.sortedCountries = this.dataCountries.map(
          (country) => country.name.common
        );
        this.coordinatesCountries = this.dataCountries.map((country) => {
          return {
            name: country.name.common,
            latlng: country.latlng,
          };
        });
      } catch (error) {
        console.error('Error loading data', error);
      }
    },
  },
});
