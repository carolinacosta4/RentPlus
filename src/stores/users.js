import { defineStore } from 'pinia'
import * as api from '../api/api'

const API_BASE_URL = "http://127.0.0.1:3000"

export const useUsersStore = defineStore('user', {
  state: () => ({
    users: [],
    user: "",
    reviews: []
  }),
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
    getOwnerReviews: (state) => state.reviews
  },
  actions: {
    async fetchUsers() {
      try {
        const response = await api.get(API_BASE_URL, `users`)
        this.users = response.data
      } catch (error) {
        console.error(error)
      }
    },

    async fetchUser(username) {
      try {
        this.users = []
        const response = await api.get(API_BASE_URL, `users/${username}`)
        this.user = response.data
      } catch (error) {
        console.error(error)
      }
    },

    async fetchUserReviews(username) {
      try {
        this.reviews = []
        const response = await api.get(API_BASE_URL, `users/${username}/reviews`)
        this.reviews = response.data
      } catch (error) {
        console.error(error)
      }
    },

    async delete(username) {
      try {
        const response = await api.remove(API_BASE_URL, `users/${username}`)
        console.log("User deleted successfully:", response.data);
      } catch (error) {
        console.error(error)
      }
    },

    async block(username) {
      try {
        // await api.patch(API_BASE_URL, `users/block/${username}`)
        const response = await api.patch(API_BASE_URL, `users/block/${username}`)
        console.log("User updated successfully:", response.data);
      } catch (error) {
        console.error(error)
      }
    },
  },
})