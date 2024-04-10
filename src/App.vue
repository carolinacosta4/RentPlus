<script setup>
import { RouterView } from "vue-router";
import NavbarVue from "./components/Navbar.vue";
</script>

<template>
  <header>
    <NavbarVue />
  </header>

  <RouterView class="my-24 mx-6 lg:mx-12 lg:my-32" />
</template>
