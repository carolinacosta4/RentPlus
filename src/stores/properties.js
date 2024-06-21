import { defineStore } from "pinia";
import * as api from "../api/api";

// const API_BASE_URL = "http://127.0.0.1:3000";
const API_BASE_URL = "https://rentplus-back-end.onrender.com"

export const usePropertiesStore = defineStore("property", {
  state: () => ({
    properties: [],
    property: "",
    pagination: null,
    pagination: "",
    token: localStorage.getItem("authToken") || null,
  }),
  getters: {
    getProperties: (state) => state.properties,
    getProperty: (state) => state.property,
    getPagination: (state) => state.pagination,
  },
  actions: {
    async fetchProperties(page) {
      try {
        this.properties = []
        let response
        if (page) {
          response = await api.get(API_BASE_URL, `properties?page=${page}&limit=20`)
        } else {
          response = await api.get(API_BASE_URL, `properties`)
        }
        this.properties = response.data.reverse()
        this.pagination = response.pagination[0]
        return response
      } catch (error) {
        console.error(error);
      }
    },

    async fetchProperty(id) {
      try {
        this.properties = ""
        const response = await api.get(API_BASE_URL, `properties/${id}`)
        this.property = response.data
        return response.data
      } catch (error) {
        console.error(error);
      }
    },
    async create(formData){
      try {
        const response = await api.postForm(API_BASE_URL, 'properties', formData,
          localStorage.getItem("authToken")
        );
      } catch (error) {
        throw error.message;
      }
    },

    async editProperty(id, formData){
      try {
        const response = await api.patchForm(API_BASE_URL, `properties/${id}`, formData, localStorage.getItem("authToken"));
        return response
      } catch (error) {
        throw error.message;
      }
    },

    async delete(id) {
      try {
        const response = await api.remove(API_BASE_URL,`properties/${id}`, this.token);
      } catch (error) {
        console.log(error);
        console.error(error)
      }
    },

    async block(id) {
      try {
        const response = await api.patch(API_BASE_URL, `properties/${id}/block`)
      } catch (error) {
        console.error(error);
      }
    },

    
  },
});
