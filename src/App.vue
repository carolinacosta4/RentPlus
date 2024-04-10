<script setup>
import { RouterView } from "vue-router";
import NavbarVue from "./components/Navbar.vue";
</script>

<template>
  <header>
    <NavbarVue />
  </header>

  <RouterView class="mt-24 mx-6" />
</template>
