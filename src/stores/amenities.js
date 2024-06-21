import { defineStore } from "pinia"
import * as api from "../api/api"

// const API_BASE_URL = "http://127.0.0.1:3000"
const API_BASE_URL = "https://rentplus-back-end.onrender.com"

export const useAmenitiesStore = defineStore("amenity", {
  state: () => ({
    amenitiesName: [],
    amenities: []
  }),
  getters: {
    getAmenitiesName: (state) => state.amenitiesName,
    getAmenities: (state) => state.amenities
  },
  actions: {
    async fetchAmenitiesName() {
      try {
        this.amenitiesName = []
        const response = await api.get(API_BASE_URL, "amenities")
        this.amenitiesName = response.data.map(amenity => amenity.amenity_name)
      } catch (error) {
        console.error(error)
      }
    },
    async fetchAmenities() {
      try {
        this.amenities = []
        const response = await api.get(API_BASE_URL, "amenities")
        this.amenities = response.data
      } catch (error) {
        console.error(error)
      }
    },
  },
});
