import { defineStore } from "pinia"
import * as api from "../api/api"

const API_BASE_URL = "http://127.0.0.1:3000"

export const useReservationsStore = defineStore("reservation", {
  state: () => ({
    reservationsProperty: []
  }),
  getters: {
    getReservationsProperty: (state) => state.reservationsProperty,
    getProperty: (state) => state.property,
  },
  actions: {
    async fetchReservationsPerProperty(id){
      try {
        this.reservationsProperty = []
        const response = await api.get(API_BASE_URL, "reservations")
        const propertyReservations = response.filter((reservation) => reservation.property_ID == id)
        this.reservationsProperty = propertyReservations
      } catch (error) {
        throw error
      }
    },

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
