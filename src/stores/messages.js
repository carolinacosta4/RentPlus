import { defineStore } from "pinia";
import * as api from "../api/api";

const API_BASE_URL = "http://127.0.0.1:3000";

export const useMessagesStore = defineStore("messages", {
  state: () => ({
    messages: [],
    message: "",
  }),
  getters: {
    getMessages: (state) => state.messages,
    getMessage: (state) => state.message,
  },
  actions: {
    // async fetchMessages() {
    //   try {
    //     this.messages = [];
    //     const response = await api.get(API_BASE_URL, "messages");
    //     this.properties = response.data;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },

    async fetchMessage(id) {
      try {
        this.messages = [];
        const response = await api.get(API_BASE_URL, `messages/${id}`);
        this.messages = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
