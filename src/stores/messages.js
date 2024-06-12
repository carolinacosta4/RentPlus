import { defineStore } from "pinia";
import * as api from "../api/api";

const API_BASE_URL = "http://127.0.0.1:3000";

export const useMessagesStore = defineStore("messages", {
  state: () => ({
    messages: [],
  }),
  getters: {
    getMessages: (state) => state.messages,
  },
  actions: {
    async fetchMessage(id) {
      try {
        this.messages = [];
        const response = await api.get(API_BASE_URL, `messages/${id}`);
        this.messages = response.data;
        console.log(this.messages);
      } catch (error) {
        console.error(error);
      }
    },

    async createMessage(newProperty) {
      try {
        console.log(newProperty);
        const response = await api.post(API_BASE_URL, 'messages', {
          receiver_username: newProperty.receiver_username,
          sender_username: newProperty.sender_username,
          content: newProperty.content
        },
          localStorage.getItem("authToken")
        );
        console.log(response);
      } catch (error) {
        throw error.message
      }
    }
  },
});
