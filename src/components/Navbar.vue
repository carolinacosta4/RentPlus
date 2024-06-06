<template>
  <nav class="bg-white fixed w-full z-20 top-0 border-b">
    <div class="z-10000 max-w-screen-3xl flex items-center justify-between mx-auto p-4">
      <!-- LOGO -->
      <router-link :to="{ name: 'home' }" @click="toggleDropdown">
        <img
          src="../assets/images/logo.svg"
          class="h-3 md:h-5"
          alt="Logo"
        />
      </router-link>

      <div class="flex items-center gap-5">
        <!-- Rent Place -->
        <router-link :to="{ name: 'rent-place' }" @click="toggleDropdown">
          <button
            class="font-medium rounded-lg text-sm px-4 py-2 button-green"
          >
            Rent+ your place
          </button>
        </router-link>

        <!-- Hamburger Menu -->
        <button
          @click="toggleDropdown"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div
          @mouseleave="toggleDropdown"
          v-show="isDropdownOpen"
          class="absolute right-0 top-16 w-48 bg-white rounded-md shadow-lg"
        >
          <div>
            <!-- Use router-link instead of anchor tags -->
            <router-link
              @click="toggleDropdown"
              :to="{ name: 'messages' }"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Messages</router-link
            >
            <router-link
              @click="toggleDropdown"
              :to="{ name: 'saved' }"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Saved</router-link
            >
            <router-link
              @click="toggleDropdown"
              :to="{ name: 'profile', params: {id: 'beatriz'} }"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Account</router-link
            >
            <router-link
              @click="toggleDropdown"
              :to="{ name: 'trips' }"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Trips</router-link
            >
            <router-link
              @click="toggleDropdown"
              :to="{ name: 'properties' }"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Properties</router-link
            >
            <router-link
              @click="toggleDropdown"
              :to="{ name: 'reservations' }"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Reservations</router-link
            >
            <router-link
              @click="usersStore.logout"
              :to="{ name: 'login' }"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Logout</router-link
            >
          </div>
        </div>

        <!-- PROFILE PICTURE -->
        <router-link :to="{ name: 'profile', params: {id: 'beatriz'} }">
          <img
            class="w-8 h-8 rounded-full"
            src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
            alt="user photo"
          />
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { useUsersStore } from "@/stores/users";

export default {
  data() {
    return {
      isDropdownOpen: false,
      usersStore: useUsersStore()
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
};
</script>
