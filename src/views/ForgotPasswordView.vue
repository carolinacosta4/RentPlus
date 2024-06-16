<template>
  <main class="py-8 px-4">
    <img src="../assets/images/logoWhite.svg" class="h-5 md:h-8" alt="Logo white" @click="this.$router.push('/')" />
    <div id="form">
      <h2 class="inter-bold font-size-24 font-color-green">Enter your email</h2>
      <form @submit.prevent="submit">
        <v-text-field type="text" v-model="email" name="email" id="inputEmail" placeholder="Email"
          class="font-size-14 inter-light input"></v-text-field>
        <div class="error-message">
          <p v-if="showError" class="font-size-13 inter-medium">{{ errorMessage }}</p>
        </div>
        <div class="confirmation-message">
          <p v-if="showConfirmation" class="font-size-13 inter-medium">{{ confirmationMessage }}</p>
        </div>
        <button type="submit" class="button-green font-size-20">Send email</button>
      </form>
    </div>
  </main>
</template>

<script>
import { useUsersStore } from "@/stores/users";

export default {
  data() {
    return {
      email: '',
      usersStore: useUsersStore(),
      showConfirmation: false,
      confirmationMessage: '',
      showError: false,
      errorMessage: ''
    }
  },

  methods: {
    async submit() {
      if (!this.email) {
        return;
      }
      this.forgotPassword();
    },
    async forgotPassword() {
      try {
        await this.usersStore.forgotPassword({ email: this.email })
        this.showConfirmation = true
        this.confirmationMessage = 'Email sent.'
      } catch (error) {
        if (error === 'API request failed with status 400: {"success":false,"msg":"User not found."}') {
          this.showError = true
          this.errorMessage = 'User with that email not found.';
        } else {
          this.showError = true
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
}

p {
  margin-bottom: -1em;
}

.confirmation-message,
.error-message {
  margin-top: -0.5em;
  margin-bottom: 0.2em;
}

.confirmation-message {
  color: green;
}

.error-message {
  color: rgb(168, 6, 6);
}
</style>