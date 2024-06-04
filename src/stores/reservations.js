import { defineStore } from "pinia"
import * as api from "../api/api"

const API_BASE_URL = "http://127.0.0.1:3000"

export const useReservationsStore = defineStore("reservation", {
  state: () => ({
    
  }),
  getters: {
    getProperties: (state) => state.properties,
    getProperty: (state) => state.property,
  },
  actions: {
    async createReservation(data) {
      try {
        const response = await api.post(API_BASE_URL, "reservations", data)
        return response
      } catch (error) {
        throw error
      }
    },
  },
});
