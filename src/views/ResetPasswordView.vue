<template>
    <main class="py-8 px-4">
        <img src="../assets/images/logoWhite.svg" class="h-5 md:h-8" alt="Logo white" @click="this.$router.push('/')" />
        <div id="form">
            <h2 class="inter-bold font-size-24 font-color-green">Reset your password</h2>
            <form @submit.prevent="submit">
                <v-text-field type="password" v-model="password" name="password" id="inputpassword" placeholder="Password"
                    class="font-size-14 inter-light input"></v-text-field>
                <div class="error-message">
                    <p v-if="showError" class="font-size-13 inter-medium">{{ errorMessage }}</p>
                </div>
                <div class="confirmation-message">
                    <p v-if="showConfirmation" class="font-size-13 inter-medium">{{ confirmationMessage }}</p>
                </div>
                <button type="submit" class="button-green font-size-20">Change password</button>
            </form>
        </div>
    </main>
</template>

<script>
import { useUsersStore } from "@/stores/users";

export default {
    data() {
        return {
            password: '',
            usersStore: useUsersStore(),
            showConfirmation: false,
            confirmationMessage: '',
            showError: false,
            errorMessage: ''
        }
    },

    methods: {
        async submit() {
            if (!this.password) {
                return;
            }
            this.resetPassword();
        },
        async resetPassword() {
            try {
                await this.usersStore.resetPassword({ username: this.$route.params.id, password: this.password })
                this.showConfirmation = true
                this.confirmationMessage = 'Password changed.'
            } catch (error) {
                this.showError = true
                this.errorMessage = 'Something went wrong. Try again!';
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