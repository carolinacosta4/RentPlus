<template>
  <nav class="bg-white fixed w-full z-20 top-0 border-b">
    <div class="max-w-screen-3xl flex items-center justify-between mx-auto p-4">
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
        <router-link v-if="loggedUser && loggedUserInfo.user_role != 'owner'" :to="{ name: 'rent-place' }" @click="toggleDropdown">
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
            <router-link v-if="loggedUser"
              @click="toggleDropdown"
              :to="{ name: 'messages' }"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Messages</router-link
            >
            <router-link v-if="loggedUser"
              @click="toggleDropdown"
              :to="{ name: 'saved' }"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Saved</router-link
            >
            <router-link v-if="loggedUser"
              @click="toggleDropdown"
              :to="{ name: 'profile', params: {id: loggedUser} }"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
              Account</router-link
            >
            <router-link v-if="loggedUser"
              @click="toggleDropdown"
              :to="{ name: 'trips' }"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Trips</router-link
            >
            <router-link v-if="loggedUser && loggedUserInfo.user_role == 'owner'"
              @click="toggleDropdown"
              :to="{ name: 'properties' }"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Properties</router-link
            >
            <router-link v-if="loggedUser && loggedUserInfo.user_role == 'owner'"
              @click="toggleDropdown"
              :to="{ name: 'reservations' }"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Reservations</router-link
            >
            <router-link v-if="loggedUser"
              :to="{ name: 'login' }"
              @click="usersStore.logout"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Logout</router-link
            >
            <router-link v-else
              :to="{ name: 'login' }"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Login</router-link
            >
          </div>
        </div>

        <!-- PROFILE PICTURE -->
        <router-link v-if="loggedUser" :to="{ name: 'profile', params: {id: loggedUser} }">
          <img
            class="w-8 h-8 rounded-full"
            :src="loggedUserInfo.profile_image"
            alt="user photo"
          />
        </router-link>

        <router-link v-else :to="{ name: 'login' }">
          <img
            class="w-8 h-8 rounded-full"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
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

  computed: {
    loggedUser() {
      return this.usersStore.getUserLogged
    },

    loggedUserInfo(){
      return this.usersStore.getUserLoggedInfo
    }
  },

  created () {
    if(this.loggedUser){
      this.usersStore.fetchUserLogged(this.loggedUser)
    };
  },
};
</script>
