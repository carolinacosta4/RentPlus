import { defineStore } from "pinia";
import * as api from "../api/api";

const API_BASE_URL = "http://127.0.0.1:3000";

export const usePropertiesStore = defineStore("property", {
  state: () => ({
    properties: [],
    property: "",
  }),
  getters: {
    getProperties: (state) => state.properties,
    getProperty: (state) => state.property,
    /* getPropertyById: (state) => (id) =>
      state.properties.find((property) => property.ID === id), */
  },
  actions: {
    async fetchProperties() {
      try {
        this.properties = [];
        const response = await api.get(API_BASE_URL, "properties");
        this.properties = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchProperty(id) {
      try {
        this.properties = "";
        const response = await api.get(API_BASE_URL, `properties/${id}`);
        this.property = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async create(newProperty){
      try {
        const response = await api.post(API_BASE_URL, 'properties', {
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
});
