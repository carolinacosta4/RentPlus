<template>
    <main class="py-8 px-4">
        <img id="logo" src="../assets/images/logo.svg" alt="Rent+ Logo">
        <h1 class="page-title font-size-32 inter-semiBold font-color-green">Email address confirmed</h1>
        <p class="font-size-16 inter-medium font-color-green">You have successfully confirmed your email
            address.</p>
        <router-link @click="" :to="{ name: 'login' }" id="button">
            <button class="font-light button-green rounded-lg">
                Return to login
            </button>
        </router-link>
    </main>
</template>

<script>
import { useUsersStore } from "@/stores/users";

export default {
    data() {
        return {
            userStore: useUsersStore()
        }
    },

    created() {
        this.userStore.confirmation(this.$route.params.id)
    },
}
</script>

<style scoped>
h1,
p {
    text-align: center;
}

p {
    margin-bottom: 4em;
}

#button {
    display: flex;
    justify-content: center;
}

#logo {
    display: block;
    margin: auto;
    margin-bottom: 4em;
    width: 25em;
}
</style>