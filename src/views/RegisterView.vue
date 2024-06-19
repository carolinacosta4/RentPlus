<template>
  <main class="py-8 px-4">
    <img src="../assets/images/logoWhite.svg" class="h-5 md:h-8" alt="Logo white" @click="this.$router.push('/')" />
    <div id="form">
      <h2 class="inter-bold font-size-24 font-color-green">Register</h2>
      <form @submit.prevent="submit">
        <div id="divs">
          <div id="div1">
            <v-text-field type="text" v-model="firstName" name="firstName" id="inputfirstName" :rules="[rules.required]"
              placeholder="First Name" class="font-size-14 inter-light input"></v-text-field>

            <v-text-field type="text" v-model="lastName" name="lastName" id="inputlastName" :rules="[rules.required]"
              placeholder="Last Name" class="font-size-14 inter-light input"></v-text-field>

            <v-text-field type="text" v-model="username" name="username" id="inputUsername" :rules="[rules.required]"
              placeholder="Username" class="font-size-14 inter-light input"></v-text-field>
          </div>

          <div id="div2">
            <v-text-field type="text" v-model="email" name="email" id="inputEmail" :rules="[rules.required]"
              placeholder="Email" class="font-size-14 inter-light input"></v-text-field>

            <v-text-field type="password" v-model="password" name="password" id="inputPassword"
              :rules="[rules.required]" placeholder="Password" class="font-size-14 inter-light input"></v-text-field>

            <v-text-field type="password" v-model="confirmPassword" name="confirmPassword" id="inputConfirmPassword"
              :rules="[rules.required]" placeholder="Confirm Password"
              class="font-size-14 inter-light input"></v-text-field>
          </div>
        </div>

        <div id="divPrivacy">
          <input type="checkbox" v-model="privacyPolicy" name="PrivacyPolicy" id="privacyPolicy"
            class="font-color-green">
          <label for="PrivacyPolicy" class="font-color-green">I agree to the Privacy Policy</label>
        </div>
        <div class="error-message">
          <p v-if="showError" class="font-size-13 inter-medium">{{ errorMessage }}</p>
        </div>
        <div class="confirmation-message">
          <p v-if="showConfirmation" class="font-size-13 inter-medium">{{ confirmationMessage }}</p>
        </div>
        <button type="submit" class="button-green font-size-20">Sign in</button>
      </form>

      <div class="moreInfo">
        <p class="inter-light font-color-green font-size-14">
          <a href="">Forgot password?</a>
        </p>
        <p class="inter-light font-color-green font-size-14">
          Already have an account? <b><router-link :to="{ name: 'login' }">Log in!</router-link></b>
        </p>
      </div>
    </div>

    <v-dialog max-width="500" v-model="showModal">
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-card-text>
            <h1 class="page-title font-size-18 inter-semiBold font-color-green">Error</h1>
            <p class="inter-light font-size-16">Your passwords do not match!</p>
          </v-card-text>

          <v-card-actions id="containerBtn">
            <div class="btnsModal">
              <button class="inter-medium button-border-green" @click="isActive.value = false">Try again</button>
            </div>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

  </main>
</template>

<script>
import { useUsersStore } from "@/stores/users";

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      privacyPolicy: false,
      showModal: false,
      rules: {
        required: (value) => !!value || "Required."
      },
      usersStore: useUsersStore(),
      showError: false,
      errorMessage: '',
      showConfirmation: false,
      confirmationMessage: ''
    }
  },
  methods: {
    async submit() {
      if (!this.username || !this.email || !this.password || !this.confirmPassword || !this.firstName || !this.lastName) {
        this.showError = true
        this.errorMessage = 'Missing information';
        throw new Error("Missing information");
      }
      else if (this.password != this.confirmPassword) {
        this.showError = true
        this.errorMessage = 'Passwords do not match';
      }
      else if (!this.privacyPolicy) {
        this.showError = true
        this.errorMessage = 'You have to agree with our terms!';
      }
      else {
        this.register();
      }

    },
    async register() {
      try {
        let newUser = {
          username: this.username,
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName
        }
        await this.usersStore.register(newUser)
        this.showConfirmation = true
        

        this.confirmationMessage = 'A confirmation email was sent please confirm your email.'
        this.showError = false
      } catch (error) {
        console.log(error);
        this.showConfirmation = false
        this.showError = true
        if (error === 'API request failed with status 409: {"success":false,"msg":"The username is already taken. Please choose another one."}') {
          this.errorMessage = 'The username is already taken.';
        }
        if (error === 'API request failed with status 409: {"success":false,"msg":"The email is already in use. Please choose another one."}') {
          this.errorMessage = 'The email is already in use.';
        }
      }
    }
  }
}
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

main {
  background-color: #133E1A;
  width: 100%;
  min-height: 100vh;
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
  row-gap: 0.5em;
}

#divs{
  display: flex;
  flex-direction: row;
  column-gap: 2em;
  margin-top: 1em;
}

.moreInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1em;
  margin-top: 1em;
}

::placeholder {
  color: #133E1A;
}

.input {
  width: 18em;
  border-radius: 6px;
  margin-bottom: 0.5em;
}

#form {
  background-color: #ffffff !important;
  padding: 3em;
  border-radius: 12px;
}

p {
  margin-bottom: -1em;
}

#divPrivacy {
  display: flex;
  flex-direction: row;
  align-items: center;
}

input#privacyPolicy {
  width: 2em !important;
}

.btnsModal {
  display: flex;
  flex-direction: row;
  justify-content: right;
  padding: 0.5rem 1rem 0.13rem;
  column-gap: 1rem;
}

#containerBtn {
  display: block;
}

.error-message {
  color: rgb(168, 6, 6);
  margin-bottom: 1em;
}

.confirmation-message {
  color: green;
  margin-bottom: 1em;
}
</style>