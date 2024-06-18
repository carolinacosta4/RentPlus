import { defineStore } from "pinia";
import * as api from "../api/api";

const API_BASE_URL = "http://127.0.0.1:3000";

export const useUsersStore = defineStore("user", {
  state: () => ({
    users: [],
    user: "",
    reviews: [],
    token: localStorage.getItem("authToken") || null,
    loggedUser: localStorage.getItem("user") || null,
    loggedUserInfo: [],
    reservations: [],
  }),
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
    getOwnerReviews: (state) => state.reviews,
    getToken: (state) => state.token,
    getUserLogged: (state) => state.loggedUser,
    getUserLoggedInfo: (state) => state.loggedUserInfo,
    getUserReservations: (state) => state.reservations,
  },
  actions: {
    async fetchUsers() {
      try {
        const response = await api.get(API_BASE_URL, `users`, this.token)
        this.users = response.data
      } catch (error) {
        console.error(error);
      }
    },

    async fetchUser(username) {
      try {
        this.user = ""
        const response = await api.get(API_BASE_URL, `users/${username}`, this.token)
        this.user = response.data
      } catch (error) {
        console.error(error);
      }
    },

    async fetchUserLogged(username) {
      try {
        this.loggedUserInfo = []
        const response = await api.get(API_BASE_URL, `users/${username}`, this.token)
        this.loggedUserInfo = response.data
      } catch (error) {
        console.error(error);
      }
    },

    async fetchUserReviews(username) {
      try {
        this.reviews = []
        const response = await api.get(API_BASE_URL, `users/${username}/reviews`, this.token)
        this.reviews = response.data
      } catch (error) {
        console.error(error);
      }
    },

    async delete(username) {
      try {
        const response = await api.remove(API_BASE_URL, `users/${username}`, this.token);
      } catch (error) {
        console.error(error);
      }
    },

    async block(username) {
      try {
        const response = await api.patch(API_BASE_URL, `users/${username}/block`)
      } catch (error) {
        console.error(error);
      }
    },

    async login(username, password) {
      try {
        const response = await api.post(API_BASE_URL, "users/login", {
          username: username,
          password: password,
        });

        if (response.success) {
          this.token = response.accessToken;
          this.loggedUser = username;
          localStorage.setItem("authToken", this.token);
          localStorage.setItem("user", this.loggedUser);
          // sessionStorage.setItem("authToken", this.token);
        }
      } catch (error) {
        throw error.message;
      }
    },

    async logout() {
      this.token = null;
      this.loggedUser = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      // sessionStorage.removeItem("authToken");
    },

    async editProfile(data, username) {
      const response = await api.patch(API_BASE_URL, `users/${username}`, data, this.token);
      if (data.username != undefined) {
        localStorage.setItem("user", data.username)
        this.loggedUser = data.username
        if (response.success) {
          this.token = response.newToken;
          localStorage.setItem("authToken", this.token);
        }
      }
    },

    async register(newUser) {
      try {
        const response = await api.post(API_BASE_URL, "users", {
          username: newUser.username,
          email: newUser.email,
          user_role: "guest",
          password: newUser.password,
          first_name: newUser.firstName,
          last_name: newUser.lastName,
        });

        if (!response.success) {
          throw new Error("Registration failed");
        }
      } catch (error) {
        throw error.message;
      }
    },

    async toggleFavorite(bool, propertyId) {
      try {
        const userId = this.loggedUser;

        if (bool) {
          // Remove from favorites
          const response = await api.remove(
            API_BASE_URL,
            `users/${userId}/favorites/${propertyId}`,
            this.token
          );
        } else {
          // Add to favorites
          const response = await api.post(
            API_BASE_URL,
            `users/${userId}/favorites`,
            { property_ID: propertyId },
            this.token
          );
        }
      } catch (error) {
        console.error("Failed to toggle property favorite status:", error);
        throw error;
      }
    },

    async fetchUserReservations(username) {
      try {
        const response = await api.get(API_BASE_URL, `reservations/${username}`, this.token);
        if (response.success) {
          this.reservations = response.data;
        }
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
        throw error;
      }
    },

    async editRole(data, username) {
      const response = await api.patch(API_BASE_URL, `users/${username}/role`, data, this.token);
      if (response.success) {
        this.token = response.accessToken;
        localStorage.setItem("authToken", this.token);
      }
    },

    async confirmation(username) {
      try {
        const response = await api.patch(API_BASE_URL, `users/${username}/confirmation`)
      } catch (error) {
        console.error(error)
      }
    },

    async forgotPassword(data) {
      try {
        const response = await api.post(API_BASE_URL, `users/reset-password-email`, data)
        return response
      } catch (error) {
        throw error.message
      }
    },

    async resetPassword(data) {
      try {
        const response = await api.patch(API_BASE_URL, `users`, data)
        return response
      } catch (error) {
        throw error.message
      }
    },
  },
});
