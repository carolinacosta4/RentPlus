import { defineStore } from "pinia";
import * as api from "../api/api";

const API_BASE_URL = "http://127.0.0.1:3000";

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

    async create(newProperty) {
      try {
        await api.post(
          API_BASE_URL,
          "properties",
          {
            owner_username: newProperty.owner_username,
            property_type: newProperty.property_type,
            title: newProperty.title,
            description: newProperty.description,
            location: newProperty.location,
            map_url: newProperty.map_url,
            daily_price: newProperty.daily_price,
            guest_number: newProperty.guest_number,
            bathrooms: newProperty.bathrooms,
            bedrooms: newProperty.bedrooms,
            beds: newProperty.beds,
            amenities: newProperty.amenities,
            photos: newProperty.photos,
          },
          localStorage.getItem("authToken")
        );
      } catch (error) {
        throw error.message;
      }
    },

    async editProperty(property) {
      try {
        const response = await api.patch(
          API_BASE_URL,
          `properties/${property.id}`,
          {
            property_type: property.property_type,
            title: property.title,
            description: property.description,
            location: property.location,
            map_url: property.map_url,
            daily_price: property.daily_price,
            guest_number: property.guest_number,
            bathrooms: property.bathrooms,
            bedrooms: property.bedrooms,
            beds: property.beds,
            amenities: property.amenities,
            photos: property.photos,
          },
          localStorage.getItem("authToken")
        );
      } catch (error) {
        throw error.message;
      }
    },

    async delete(id) {
      try {
        const response = await api.remove(API_BASE_URL,`properties/${id}`,this.token);
      } catch (error) {
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
