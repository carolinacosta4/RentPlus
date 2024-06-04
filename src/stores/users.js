import { defineStore } from 'pinia'
import * as api from '../api/api'

const API_BASE_URL = "http://127.0.0.1:3000"

export const useUsersStore = defineStore('user', {
  state: () => ({
    users: [],
    user: "",
    reviews: [],
    token: null
  }),
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
    getOwnerReviews: (state) => state.reviews,
    getToken: (state) => state.token
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
    async login(username, password) {
      try {
        const response = await api.post(`${API_BASE_URL}/users`, 'login', {
          username: username,
          password: password
        });
    
        if (response.success) {
          this.token = response.accessToken;
          sessionStorage.setItem("authToken", this.token);
        }

      } catch (error) {
        throw error.message 
      }
    },
    async logout(){
      this.token = null
      sessionStorage.removeItem("authToken");
    }
  },
})