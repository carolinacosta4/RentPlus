import { defineStore } from "pinia";
import * as api from "../api/api";

// const API_BASE_URL = "http://127.0.0.1:3000";
const API_BASE_URL = "https://rentplus-back-end.onrender.com"

export const usePaymentTypesStore = defineStore("paymentTypes", {
  state: () => ({
    paymentTypes: [],
  }),
  getters: {
    getTypes: (state) => state.paymentTypes,
  },
  actions: {
    async fetchPaymentTypes() {
      try {
        this.paymentTypes = [];
        const response = await api.get(API_BASE_URL, "paymentTypes", localStorage.getItem("authToken"));
        this.paymentTypes = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
