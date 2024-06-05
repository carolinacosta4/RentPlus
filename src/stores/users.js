import { defineStore } from 'pinia'
import * as api from '../api/api'

const API_BASE_URL = "http://127.0.0.1:3000"

export const useUsersStore = defineStore('user', {
  state: () => ({
    users: [],
    user: "",
    reviews: [],
    token: null,
    loggedUser: "alice"
  }),
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
    getOwnerReviews: (state) => state.reviews,
    getToken: (state) => state.token,
    getUserLogged: (state) => state.loggedUser
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
        const response = await api.patch(API_BASE_URL, `users/block/${username}`)
        console.log("User updated successfully:", response.data);
      } catch (error) {
        console.error(error)
      }
    },

    async login(username, password) {
      try {
        const response = await api.post(API_BASE_URL, 'users/login', {
          username: username,
          password: password
        });
    
        if (response.success) {
          this.token = response.accessToken;
          this.loggedUser = username
          console.log(this.loggedUser);
          sessionStorage.setItem("authToken", this.token);
        }

      } catch (error) {
        throw error.message 
      }
    },

    async logout(){
      this.token = null
      this.loggedUser = ""
      sessionStorage.removeItem("authToken");
    },

    async editProfile(data, username){
      console.log(data);
      const response = await api.patch(API_BASE_URL, `users/${username}`, data);
      console.log("User edited successfully:", response);

    },
    async register(newUser){
      try {
        const response = await api.post(API_BASE_URL, 'users', {
          username: newUser.username,
          email: newUser.email,
          user_role: "guest",
          password: newUser.password,
          first_name: newUser.firstName,
          last_name: newUser.lastName
        });

        if (response.success) {
          await this.login(newUser.username, newUser.password);
        } else {
          throw new Error('Registration failed');
        }
      } catch (error) {
        throw error.message
      }
    }
  },
})