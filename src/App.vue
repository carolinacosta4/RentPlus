<script>
import { RouterView } from "vue-router";
import NavbarVue from "./components/Navbar.vue";
export default{
  components: {
    NavbarVue,
  },
}
</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap"
    rel="stylesheet"
  />
  <header>
    <NavbarVue
      v-if="
        $route.name !== 'register' &&
        $route.name !== 'rent-place' &&
        $route.name !== 'login'  &&
        $route.name !== 'confirmation' &&
        $route.name !== 'forgot-password' &&
        $route.name !== 'reset-password'
      "
    />
  </header>
  <RouterView v-if="$route.name == 'rent-place'" />
  <RouterView class="mt-24 mx-10" v-else />
</template>

<style>
.inter-semiBold {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
  font-variation-settings: "slnt" 0;
}

.inter-medium {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-variation-settings: "slnt" 0;
}

.inter-light {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  font-variation-settings: "slnt" 0;
}

.inter-bold {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
  font-variation-settings: "slnt" 0;
}

.font-size-13 {
  font-size: 13px;
}

.font-size-14 {
  font-size: 14px;
}

.font-size-16 {
  font-size: 16px;
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
  color: #133e1a;
}

.font-color-black {
  color: #000000;
}

.font-color-white {
  color: #f5f5f5;
}

.font-color-grey {
  color: #b8b8b8;
}

.font-color-red {
  color: #ff0000;
}

.page-title {
  margin-bottom: 1.5em;
}

.button-white {
  background-color: #f5f5f5;
  color: #133e1a;
  border-radius: 8px;
  width: 10em;
  height: 2.5em;
  font-size: 15px;
}

.button-green {
  background-color: #133e1a;
  color: #f5f5f5;
  border-radius: 8px;
  width: 10em;
  height: 2.5em;
  font-size: 15px;
}

.button-red {
  background-color: #ff0000;
  color: #f5f5f5;
  border-radius: 8px;
  width: 10em;
  height: 2.5em;
  font-size: 15px;
}

.button-border-green {
  border: #133e1a20 solid 1px;
  color: #133e1a;
  border-radius: 8px;
  width: 10em;
  height: 2.5em;
  font-size: 15px;
}

input[type="text"]:focus {
  outline: none;
  border-color: #133e1a20;
}

::placeholder {
  color: rgba(19, 62, 26, 0.609);
}

.green-bg {
  background-color: #133e1a;
}
</style>