import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore('store', {
  state: () => ({
    mode: 'light',
    title: 'Rest countries',
    currentComponent: 'Countries',
    sortDirection: 'asc',
    dataCountries: [],
    sortedCountries: [],
    coordinatesCountries: [],
    favoriteCountries: [],
    selectedCountry: null,
    selectedCountryMap: null,
    searchQuery: '',
    filteredCountries: [],
  }),
  actions: {
    async fetchDataCountries() {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        this.dataCountries = response.data;
        this.sortedCountries = this.dataCountries.map((country) => {
          return {
            name: country.name.common,
            isFavorite: false,
          };
        });
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
    setComponent(name) {
      this.currentComponent = name;
    },
    toggleMode() {
      this.mode = this.mode === 'light' ? 'dark' : 'light';
    },
    setTitle(newTitle) {
      this.title = newTitle;
    },

    showCountryDetails(country) {
      this.selectedCountry = this.selectedCountry === country ? null : country;
    },
    clearCountryDetails() {
      this.selectedCountry = null;
    },
    renderCountryMap(country) {
      this.selectedCountryMap = country;
    },
    clearCountryMap() {
      this.selectedCountryMap = null;
    },
    toggleFavorite(country) {
      country.isFavorite = !country.isFavorite;
      if (country.isFavorite) {
        this.favoriteCountries.push(country.name);
      } else {
        let index = this.favoriteCountries.indexOf(country.name);
        this.favoriteCountries.splice(index, 1);
      }
    },
    sortСountries() {
      this.displayCountries.sort((a, b) => {
        if (this.sortDirection === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    },
    filterCountries() {
      const query = this.searchQuery.toLowerCase();
      this.filteredCountries = this.sortedCountries.filter((country) =>
        country.name.toLowerCase().includes(query)
      );
    },
  },
  getters: {
    // sortedCountries(state) {
    //     return [...state.countries].sort((a, b) => a[state.sortKey].localeCompare(b[state.sortKey]));
    // },
    // filteredCountries(state) {
    //     const query = state.searchQuery.toLowerCase();
    //     return state.countries.filter(country =>
    //         country.name.toLowerCase().includes(query)
    //     );
    // },
    displayCountries(state) {
      return state.searchQuery === ''
        ? this.sortedCountries
        : this.filteredCountries;
    },
  },
});
