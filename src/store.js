import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore('store', {
  state: () => ({
    mode: 'light',
    title: 'Rest countries',
    currentComponent: 'Countries',
    countries: [],
    selectedCountry: null,
    selectedCountryMap: null,
    showMoreDetails: false,
    searchQuery: '',
    favoriteCountries: [],
    viewedCountries: [],
    sortDirectionAlphabetically: 'asc',
    sortDirectionPopulation: true,
    sortDirectionArea: true,
    selectedSortMethod: '',
  }),

  actions: {
    async fetchDataCountries() {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        this.countries = response.data.map((country) => {
          return {
            ...country,
            isFavorite: false,
          };
        });
      } catch (error) {
        console.error('Error loading data', error);
      }
    },
    toggleMode() {
      this.mode = this.mode === 'light' ? 'dark' : 'light';
    },
    setTitle(newTitle) {
      this.title = newTitle;
    },
    setComponent(name) {
      this.currentComponent = name;
    },
    showCountryDetails(country) {
      this.selectedCountry = this.selectedCountry === country ? null : country;
    },
    addMoreDetails() {
      this.showMoreDetails = !this.showMoreDetails;
    },
    renderCountryMap(country) {
      this.selectedCountryMap = country;
    },
    backCountries() {
      this.setComponent('Countries');
      this.selectedCountry = null;
      this.selectedCountryMap = null;
      this.title = 'Rest countries';
    },
    toggleFavorite(country) {
      country.isFavorite = !country.isFavorite;
      if (country.isFavorite) {
        this.favoriteCountries.push(country.name.common);
      } else {
        let index = this.favoriteCountries.indexOf(country.name.common);
        this.favoriteCountries.splice(index, 1);
      }
    },
    addToHistory(country) {
      if (!this.viewedCountries.includes(country)) {
        this.viewedCountries.push(country);
        this.saveHistory();
      }
    },
    saveHistory() {
      localStorage.setItem(
        'viewedCountries',
        JSON.stringify(this.viewedCountries)
      );
    },
    loadingHistory() {
      const dataHistory = localStorage.getItem('viewedCountries');
      if (dataHistory) {
        this.viewedCountries = JSON.parse(dataHistory);
      }
    },
  },

  getters: {
    sortedCountries(state) {
      return [...state.countries].sort((a, b) => {
        switch (state.selectedSortMethod) {
          case 'alphabeticallyA':
            return a.name.common.localeCompare(b.name.common);
          case 'alphabeticallyZ':
            return b.name.common.localeCompare(a.name.common);
          case 'populationAsc':
            return a.population - b.population;
          case 'populationDesc':
            return b.population - a.population;
          case 'areaAsc':
            return a.area - b.area;
          case 'areaDesc':
            return b.area - a.area;
          default:
            return 0;
        }
      });
    },
    filteredCountries(state) {
      const query = state.searchQuery.toLowerCase();
      return state.sortedCountries.filter((country) =>
        country.name.common.toLowerCase().includes(query)
      );
    },
  },
});
