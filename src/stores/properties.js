import { defineStore } from "pinia"
import * as api from "../api/api"

const API_BASE_URL = "http://127.0.0.1:3000"

export const usePropertiesStore = defineStore("property", {
  state: () => ({
    properties: [],
    property: "",
  }),
  getters: {
    getProperties: (state) => state.properties,
    getProperty: (state) => state.property,
  },
  actions: {
    async fetchProperties() {
      try {
        this.properties = []
        const response = await api.get(API_BASE_URL, "properties")
        this.properties = response.data
      } catch (error) {
        console.error(error)
      }
    },

    async fetchProperty(id) {
      try {
        this.properties = ""
        const response = await api.get(API_BASE_URL, `properties/${id}`)
        this.property = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async create(newProperty){
      console.log(localStorage.getItem("authToken"));
      try {
        const response = await api.post(API_BASE_URL, 'properties', {
          owner_username: newProperty.owner_username,
          property_type: newProperty.type,
          title: newProperty.title,
          description: newProperty.description,
          location: newProperty.location,
          map_url: newProperty.mapUrl,
          daily_price: newProperty.price,
          guest_number: newProperty.guests,
          bathrooms: newProperty.bathrooms,
          bedrooms: newProperty.bedrooms,
          beds: newProperty.beds,
          amenities: newProperty.amenities,
          photos: newProperty.photos,

        },
        localStorage.getItem("authToken")
      );


      } catch (error) {
        throw error.message
      }
    }
  },
});
