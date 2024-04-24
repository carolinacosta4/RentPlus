<template>
  <main class="py-8 px-4">
      <img src="../assets/images/logoWhite.svg" class="h-5 md:h-8" alt="Logo white" @click="this.$router.push('/')"/>
      <div id="form">
        <h2 class="inter-bold font-size-24 font-color-green">Log in</h2>
        <form  @submit.prevent="login">
          <input type="text" v-model="username" name="username" id="inputUsername" required placeholder="Username" class="font-size-14 inter-light">
          <input type="password" v-model="password" name="password" id="inputPassword" required placeholder="Password" class="font-size-14 inter-light">
          <button type="submit" class="button-green font-size-20">Get in</button>
        </form>
        <p class="inter-light font-color-green font-size-14">
          <a href="">Forgot password?</a>
        </p>
        <p class="inter-light font-color-green font-size-14">
          Don't have an account? <b><router-link :to="{name: 'register'}">Register!</router-link></b>
        </p>
      </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  created() {
    this.$router;
  },
  methods: {
    login(){
      let user = [
        this.username,
        this.password
      ]
      console.log(user)
      this.$router.push({ name: "home" })
    }
  }
}
</script>

<style scoped>
main{
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

#form, form{
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1.5em;
}

input{
  background-color: #F2F2F2;
  padding: 0.5em;
  width: 18em;
  border-radius: 6px;
}

::placeholder{
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
</style>