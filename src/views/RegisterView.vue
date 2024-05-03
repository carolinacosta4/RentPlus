<template>
  <main class="py-8 px-4">
    <img src="../assets/images/logoWhite.svg" class="h-5 md:h-8" alt="Logo white" @click="$router.push('/')" />
    <div id="form">
      <h2 class="inter-bold font-size-24 font-color-green">Register</h2>
      <form @submit.prevent="register">
        <v-text-field type="text" v-model="username" name="username" id="inputUsername" :rules="[rules.required]" placeholder="Username"
          class="font-size-14 inter-light input"></v-text-field>

        <v-text-field type="text" v-model="email" name="email" id="inputEmail" :rules="[rules.required]" placeholder="Email"
          class="font-size-14 inter-light input"></v-text-field>

        <v-text-field type="password" v-model="password" name="password" id="inputPassword" :rules="[rules.required]" placeholder="Password"
          class="font-size-14 inter-light input"></v-text-field>

        <v-text-field type="password" v-model="confirmPassword" name="confirmPassword" id="inputConfirmPassword" :rules="[rules.required]"
          placeholder="Confirm Password" class="font-size-14 inter-light input"></v-text-field>

        <div id="divPrivacy">
          <input type="checkbox" v-model="privacyPolicy" name="PrivacyPolicy" id="privacyPolicy"
            class="font-color-green">
          <label for="PrivacyPolicy" class="font-color-green">I agree to the Privacy Policy</label>
        </div>
        <button type="submit" class="button-green font-size-20">Sign in</button>
      </form>
      <p class="inter-light font-color-green font-size-14">
        <a href="">Forgot password?</a>
      </p>
      <p class="inter-light font-color-green font-size-14">
        Already have an account? <b><router-link :to="{ name: 'login' }">Log in!</router-link></b>
      </p>
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
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      privacyPolicy: '',
      showModal: false,
      rules: {
        required: (value) => !!value || "Required."
      },
    }
  },
  methods: {
    register() {
      if (!this.username || !this.email || !this.password || !this.confirmPassword){
        throw new Error("Missing information");
      }
      else if (this.password != this.confirmPassword) {
        this.showModal = true;
      }
      else {
        try {
          let newUser = [
            this.username, this.email, this.password, this.confirmPassword
          ]
          console.log(newUser)
          $router.push({ name: "home" })
        } catch (error) {
          alert(`Error: ${error.message}`)
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

::placeholder {
  color: #133E1A;
}

.input {
  width: 18em;
  border-radius: 6px;
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
</style>