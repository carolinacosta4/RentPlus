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
    getPropertyById: (state) => (id) =>
      state.properties.find((property) => property.ID === id),
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
  },
});
