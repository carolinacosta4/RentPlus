<template>
  <main class="py-8 px-4">
    <img src="../assets/images/logoWhite.svg" class="h-5 md:h-8" alt="Logo white" @click="this.$router.push('/')" />
    <div id="form">
      <h2 class="inter-bold font-size-24 font-color-green">Log in</h2>
      <form @submit.prevent="submit">
        <v-text-field type="text" v-model="username" name="username" id="inputUsername" :rules="[rules.required]"
          placeholder="Username" class="font-size-14 inter-light input"></v-text-field>
        <v-text-field type="password" v-model="password" name="password" id="inputPassword" :rules="[rules.required]"
          placeholder="Password" class="font-size-14 inter-light input"></v-text-field>
        <div class="error-message">
          <p v-if="showError" class="font-size-13 inter-medium">{{ errorMessage }}</p>
        </div>
        <button type="submit" class="button-green font-size-20">Get in</button>
      </form>
      <p class="inter-light font-color-green font-size-14">
        <a href="">Forgot password?</a>
      </p>
      <p class="inter-light font-color-green font-size-14">
        Don't have an account? <b><router-link :to="{ name: 'register' }">Register!</router-link></b>
      </p>
    </div>
  </main>
</template>

<script>
import { useUsersStore } from "@/stores/users";

export default {
  data() {
    return {
      username: '',
      password: '',
      rules: {
        required: (value) => !!value || "Required."
      },
      usersStore: useUsersStore(),
      showError: false,
      errorMessage: ''
    }
  },
  methods: {
    async submit() {
      if (!this.username || !this.password) {
        this.showError = true;
        this.errorMessage = 'Username and password are required';
        return;
      }
      this.login();
    },
    async login() {
      try {
        await this.usersStore.login(this.username, this.password)
        if (this.usersStore.getToken != null) {
          this.$router.push({ name: "home" })
        }
        this.showError = false
      } catch (error) {
        this.showError = true
        if (error === 'API request failed with status 401: {"success":false,"accessToken":null,"msg":"Invalid credentials!"}'){
          this.errorMessage = 'Wrong password';
        }
        else if (error === 'API request failed with status 404: {"success":false,"msg":"User not found."}'){
          this.errorMessage = 'User not found';
        }
        else if (error === 'API request failed with status 400: {"success":false,"msg":"Must provide username and password."}'){
          this.errorMessage = 'Username and password are required';
        }
        else if(error === 'API request failed with status 403: {"success":false,"accessToken":null,"msg":"User blocked"}'){
          this.errorMessage = 'User is blocked. Contact us for more information.';
        }
        else {
          this.errorMessage = 'Something went wrong. Try again!';
        }
      }

    }
  }
}
</script>

<style scoped>
main {
  background-color: #133E1A;
  width: 100vw;
  height: 100vh;
  margin: 0 !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

img {
  margin-bottom: 2em;
}

#form,
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1.5em;
}

.input {
  width: 18em;
  border-radius: 6px;
}

::placeholder {
  color: #133E1A;
}

#form {
  background-color: #ffffff !important;
  padding: 3em;
  border-radius: 12px;
  width: 25rem;
}

p {
  margin-bottom: -1em;
}

.error-message{
  color: rgb(168, 6, 6);
  margin-top: -0.5em;
  margin-bottom: 0.2em;
  text-align: center;
}
</style>