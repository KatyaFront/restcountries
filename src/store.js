import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore('store', {
  state: () => ({
    mode: 'light',
    title: 'Rest countries',
    currentComponent: 'Countries',
    countries: [],
    favoriteCountries: [],
    selectedCountry: null,
    selectedCountryMap: null,
    sortDirectionAlphabetically: 'asc',
    sortDirectionPopulation: true,
    sortDirectionArea: true,
    searchQuery: '',
    viewedCountries: [],
    history: [],
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
    backCountries() {
      this.setComponent('Countries');
      this.title = 'Rest countries';
      this.selectedCountryMap = null;
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
    sortAlphabetically() {
      this.filteredCountries.sort((a, b) => {
        if (this.sortDirectionAlphabetically === 'asc') {
          return a.name.common.localeCompare(b.name.common);
        } else {
          return b.name.common.localeCompare(a.name.common);
        }
      });
      this.sortDirectionAlphabetically =
        this.sortDirectionAlphabetically === 'asc' ? 'desc' : 'asc';
    },
    sortPopulation() {
      this.filteredCountries.sort((a, b) => {
        if (this.sortDirectionPopulation) {
          return a.population - b.population;
        } else {
          return b.population - a.population;
        }
      });
      this.sortDirectionPopulation = !this.sortDirectionPopulation;
    },
    sortArea() {
      this.filteredCountries.sort((a, b) => {
        if (this.sortDirectionArea) {
          return a.area - b.area;
        } else {
          return b.area - a.area;
        }
      });
      this.sortDirectionArea = !this.sortDirectionArea;
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
        this.history = JSON.parse(dataHistory);
      }
    },
  },

  getters: {
    filteredCountries(state) {
      const query = state.searchQuery.toLowerCase();
      return state.searchQuery === ''
        ? state.countries
        : state.countries.filter((country) =>
            country.name.common.toLowerCase().includes(query)
          );
    },
    sortedCountries(state) {
      return state.selectedSortMethod === ''
        ? state.filteredCountries
        : state.filteredCountries.sort((a, b) => {
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
  },
});
