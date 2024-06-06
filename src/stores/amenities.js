import { defineStore } from "pinia"
import * as api from "../api/api"

const API_BASE_URL = "http://127.0.0.1:3000"

export const useAmenitiesStore = defineStore("amenity", {
  state: () => ({
    amenities: []
  }),
  getters: {
    getAmenities: (state) => state.amenities,
    getAmenitiesMap: (state) => {
      return state.amenities.reduce((map, amenity) => {
        map[amenity.amenity_name] = amenity.id;
        return map;
      }, {});
    },

  },
  actions: {
    async fetchAmenities() {
      try {
        this.amenities = []
        const response = await api.get(API_BASE_URL, "amenities")
        this.amenities = response.data.map(amenity => amenity.amenity_name)
      } catch (error) {
        console.error(error)
      }
    },
  },
});
