import { defineStore } from 'pinia'
import * as api from '../api/api'

const API_BASE_URL = "http://127.0.0.1:3000"

export const useReviewsStore = defineStore('review', {
  state: () => ({ 
    reviews: [],
  }),
  getters: {
    getReviews: (state) => state.reviews,
  },
  actions: {
    async fetchReviews(id) {
      try {
        this.reviews = []
        const response = await api.get(API_BASE_URL, `properties/${id}/reviews`)
        this.reviews = response.data
      } catch (error) {
        console.error(error)
      }
    },
  },
})