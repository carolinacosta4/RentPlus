<script setup>
import { RouterView } from "vue-router";
import NavbarVue from "./components/Navbar.vue";
</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap" rel="stylesheet">
  <header >
    <NavbarVue v-if="this.$route.name !== 'register' && this.$route.name !== 'rent-place' && this.$route.name !== 'login'" />
  </header>

  <RouterView class="mt-24 mx-10" />
</template>

<style>
.inter-semiBold {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
  font-variation-settings:
    "slnt" 0;
}

.inter-medium {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-variation-settings:
    "slnt" 0;
}

.inter-light {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  font-variation-settings:
    "slnt" 0;
}

.inter-bold {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
  font-variation-settings:
    "slnt" 0;
}

.font-size-14 {
  font-size: 14px;
}

.font-size-18 {
  font-size: 18px;
}

.font-size-20 {
  font-size: 20px;
}

.font-size-24 {
  font-size: 24px;
}

.font-size-32 {
  font-size: 32px;
}

.font-color-green {
  color: #133E1A;
}

.font-color-black {
  color: #000000;
}

.font-color-white {
  color: #F5F5F5;
}

.font-color-grey {
  color: #B8B8B8;
}

.page-title {
  margin-bottom: 1.5em;
}

.button-white {
  background-color: #F5F5F5;
  color: #133E1A;
  border-radius: 8px;
  width: 10em;
  height: 2.5em;
  font-size: 15px;
}

.button-green {
  background-color: #133E1A;
  color: #F5F5F5;
  border-radius: 8px;
  width: 10em;
  height: 2.5em;
  font-size: 15px;
}

.button-border-green {
  border: #133E1A20 solid 1px;
  color: #133E1A;
  border-radius: 8px;
  width: 10em;
  height: 2.5em;
  font-size: 15px;
}

input[type='text']:focus {
  outline: none;
  border-color: #133E1A20;
}

input::placeholder {
  color: #133E1A20;
}
</style>