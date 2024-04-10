<template>
  <nav class="bg-white fixed w-full z-20 top-0 border-b">
    <div class="max-w-screen-3xl flex items-center justify-between mx-auto p-4">
      <!-- LOGO -->
      <router-link to="/">
        <img src="../assets/images/logo.svg" class="h-3 md:h-5" alt="Logo" />
      </router-link>

      <div class="flex items-center gap-5">
        <!-- Rent Place -->
        <button
          class="text-black hover:bg-gray-100 font-medium rounded-lg text-sm px-4 py-2"
        >
          Rent+ your place
        </button>

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
          v-show="isDropdownOpen"
          class="absolute right-0 top-16 w-48 bg-white rounded-md shadow-lg"
        >
          <div>
            <!-- Use router-link instead of anchor tags -->
            <router-link
              to="/messages"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Messages</router-link
            >
            <router-link
              to="/saved"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Saved</router-link
            >
            <router-link
              to="/account"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Account</router-link
            >
            <router-link
              to="/trips"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Trips</router-link
            >
            <router-link
              to="/properties"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Properties</router-link
            >
            <router-link
              to="/reservations"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Reservations</router-link
            >
            <router-link
              to="/register"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Logout</router-link
            >
          </div>
        </div>

        <!-- PROFILE PICTURE -->
        <router-link to="/profile">
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
export default {
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
};
</script>
