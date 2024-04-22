<template>
  <main class="py-8 px-4">
    <img src="../assets/images/logoWhite.svg" class="h-5 md:h-8" alt="Logo white" />
    <div id="form">
      <h2 class="inter-bold font-size-24 font-color-green">Register</h2>
      <form @submit.prevent="register">
        <input type="text" v-model="username" name="username" id="inputUsername" required placeholder="Username"
          class="font-size-14 inter-light">
        <input type="text" v-model="email" name="email" id="inputEmail" required placeholder="Email"
          class="font-size-14 inter-light">
        <input type="password" v-model="password" name="password" id="inputPassword" required placeholder="Password"
          class="font-size-14 inter-light">
        <input type="password" v-model="confirmPassword" name="confirmPassword" id="inputConfirmPassword" required
          placeholder="Confirm Password" class="font-size-14 inter-light">
        <div id="divPrivacy">
          <input type="checkbox" v-model="privacyPolicy" name="PrivacyPolicy" id="privacyPolicy" required>
          <label for="PrivacyPolicy">I agree to the Privacy Policy</label>
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
      privacyPolicy: ''
    }
  },
  methods: {
    register() {
      if (this.password != this.confirmPassword) {
        alert('Passwords do not match')
      }
      else {
        try {
          let newUser = [
            this.username, this.email, this.password, this.confirmPassword
          ]
          console.log(newUser);
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

input {
  background-color: #F2F2F2;
  padding: 0.5em;
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
</style>