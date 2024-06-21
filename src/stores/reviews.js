import { defineStore } from "pinia";
import * as api from "../api/api";

// const API_BASE_URL = "http://127.0.0.1:3000";
const API_BASE_URL = "https://rentplus-back-end.onrender.com"

export const useReviewsStore = defineStore("review", {
  state: () => ({
    reviews: [],
  }),
  getters: {
    getReviews: (state) => state.reviews,
  },
  actions: {
    async fetchReviews(id) {
      try {
        const response = await api.get(API_BASE_URL, `properties/${id}/reviews`)
        this.reviews = response.data
      } catch (error) {
        console.error(error)
        // return []
      }
    },

    async postReview(id, review) {
      const data = {
        reservation_ID: review.reservationID,
        comment: review.comment,
        rating: review.rating,
      };

      try {
        const response = await api.post(
          API_BASE_URL,
          `properties/${id}/reviews`,
          data,
          localStorage.getItem("authToken")
        );
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    },
  },
});
