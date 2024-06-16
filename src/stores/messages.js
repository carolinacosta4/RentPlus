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
        const response = await api.get(API_BASE_URL, `messages/${id}`, localStorage.getItem("authToken"));
        this.messages = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async createMessage(newMessage) {
      try {
        const response = await api.post(API_BASE_URL, 'messages', {
          receiver_username: newMessage.receiver_username,
          sender_username: newMessage.sender_username,
          content: newMessage.content
        },
          localStorage.getItem("authToken")
        );
      } catch (error) {
        throw error.message
      }
    }
  },
});
