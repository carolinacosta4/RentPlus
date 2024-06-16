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
    favorites: [],
    reservations: [],
  }),
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
    getOwnerReviews: (state) => state.reviews,
    getToken: (state) => state.token,
    getUserLogged: (state) => state.loggedUser,
    getUserLoggedInfo: (state) => state.loggedUserInfo,
    getUserFavorites: (state) => state.favorites,
    getUserReservations: (state) => state.reservations,
  },
  actions: {
    async fetchUsers() {
      try {
        const response = await api.get(API_BASE_URL, `users`);
        this.users = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchUser(username) {
      try {
        this.user = "";
        const response = await api.get(API_BASE_URL, `users/${username}`);
        this.user = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchUserLogged(username) {
      try {
        this.loggedUserInfo = [];
        const response = await api.get(API_BASE_URL, `users/${username}`);
        this.loggedUserInfo = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchUserReviews(username) {
      try {
        this.reviews = [];
        const response = await api.get(
          API_BASE_URL,
          `users/${username}/reviews`
        );
        this.reviews = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async delete(username) {
      try {
        const response = await api.remove(
          API_BASE_URL,
          `users/${username}`,
          this.token
        );
        console.log(response.msg);
      } catch (error) {
        console.error(error);
      }
    },

    async block(username) {
      try {
        const response = await api.patch(
          API_BASE_URL,
          `users/block/${username}`
        );
        console.log("User updated successfully:", response.data);
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
      const response = await api.patch(
        API_BASE_URL,
        `users/${username}`,
        data,
        this.token
      );
      console.log("User edited successfully:", response);
      if (data.username != undefined) {
        localStorage.setItem("user", data.username);
        this.loggedUser = data.username;
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

        if (response.success) {
          await this.login(newUser.username, newUser.password);
        } else {
          throw new Error("Registration failed");
        }
      } catch (error) {
        throw error.message;
      }
    },

    async toggleFavorite(propertyId) {
      try {
        // see if user is logged in
        const userId = this.loggedUser;
        if (!userId) {
          throw new Error("User not logged in");
        }

        // Check if the property is already in favorites
        const isFavorite = this.getUserFavorites.some(
          (fav) => fav.property_ID === propertyId
        );

        if (isFavorite) {
          // Remove from favorites
          const response = await api.remove(
            API_BASE_URL,
            `users/${userId}/favorites/${propertyId}`,
            this.token
          );
          if (response.success) {
            console.log("Property removed from favorites:", response.msg);
            // Update local state to reflect the change
            this.favorites = this.favorites.filter(
              (fav) => fav.property_ID !== propertyId
            );
          }
        } else {
          // Add to favorites
          const response = await api.post(
            API_BASE_URL,
            `users/${userId}/favorites`,
            { property_ID: propertyId },
            this.token
          );
          if (response.success) {
            console.log("Property added to favorites:", response.msg);
            // Update local state to reflect the change
            this.favorites.push({ property_ID: propertyId });
          }
        }
      } catch (error) {
        console.error("Failed to toggle property favorite status:", error);
        throw error;
      }
    },

    async fetchUserReservations(username) {
      try {
        const response = await api.get(
          API_BASE_URL,
          `reservations/${username}`,
          this.token
        );
        if (response.success) {
          this.reservations = response.data;
          console.log(response);
        }
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
        throw error;
      }
    },
  },
});
