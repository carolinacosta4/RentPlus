<template>
  <main class="py-8 px-4 md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-8">
    <div id="normalProfile">
      <div id="pictureProfile">
        <img class="w-40 h-40 rounded-full object-cover" :src="user.profile_image" alt="user profile picture" />
      </div>
      <div id="usernameProfile">
        <h1 class="inter-medium font-size-32 font-color-green">{{ user.username }}</h1>
        <v-dialog max-width="500">
          <template v-slot:activator="{ props: activatorProps }">
            <Edit fillColor="#133E1A" v-bind="activatorProps" v-if="user.username == loggedUser"></Edit>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card>
              <v-card-text>
                <h1 class="page-title font-size-14 modalTitle inter-light">Edit your profile</h1>
                <div id="inputs">
                  <label class="inter-medium">Name</label>
                  <input class="inter-medium" type="text" v-model="newName" :placeholder="user.first_name" />

                  <label class="inter-medium">Surname</label>
                  <input type="text" v-model="newSurname" :placeholder="user.last_name" />

                  <label class="inter-medium">Username</label>
                  <input class="inter-medium" type="text" v-model="newUsername" :placeholder="user.username" />

                  <label class="inter-medium">Phone Number</label>
                  <input class="inter-medium" type="text" v-model="newPhone" :placeholder="user.phone_number" />
                </div>
                <p id="sucessMessage">{{ sucessMessage }}</p>
                <p id="errorMessage">{{ errorMessage }}</p>
              </v-card-text>

              <v-card-actions>
                <div class="btnsModal">
                  <button class="inter-medium button-green" @click="editProfile">Save changes</button>
                  <button class="inter-medium button-border-green" @click="isActive.value = false">Cancel</button>
                </div>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </div>
      <div id="photoBtn">
        <button class="font-color-green inter-bold button-white" @click="triggerFileInput"
          v-if="user.username == loggedUser">Change photo</button>

        <button class="font-color-green inter-bold button-white"
          v-if="user.username != loggedUser && user.user_role == 'owner'">
          <router-link :to="{ name: 'messages', params: { id: user.username } }"><button class="button-green"
              id="msgBtn">Message {{ user.username
              }}</button></router-link></button>
        <!-- AQUI -->
        <input type="file" ref="fileInput" name="inputProfilePicture" style="display: none" />
      </div>
      <div id="infoProfile">
        <h3 class="inter-medium font-size-20 firstName font-color-green">First name</h3>
        <p class="inter-light font-size-20">{{ user.first_name }}</p>
        <h3 class="inter-medium font-size-20 font-color-green">Last name</h3>
        <p class="inter-light font-size-20">{{ user.last_name }}</p>
        <h3 class="inter-medium font-size-20 font-color-green">Phone number</h3>
        <p class="inter-light font-size-20">+{{ user?.phone_number }}</p>
        <h3 class="inter-medium font-size-20 font-color-green">Email</h3>
        <p class="inter-light font-size-20">{{ user.email }}</p>
      </div>
    </div>
    <div id="ownerProfile" v-if="user.user_role == 'owner'">
      <div id="container">
        <div id="editDescription">
          <h2 class="inter-medium font-size-24 font-color-green">
            Owner fields
          </h2>
          <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <Edit fillColor="#133E1A" v-bind="activatorProps" v-if="user.username == loggedUser"></Edit>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card>
                <v-card-text>
                  <h1 class="page-title font-size-14 modalTitle inter-light">
                    Edit your profile description
                  </h1>
                  <div id="inputs">
                    <label class="inter-medium">Description</label>
                    <textarea name="newDescription" class="inter-medium" cols="30" rows="10" id="newDescription"
                      v-model="newDescription" :placeholder="user.owner_description"></textarea>
                  </div>
                </v-card-text>

                <v-card-actions>
                  <div class="btnsModal">
                    <button class="inter-medium button-green" @click="editProfile">Save changes</button>
                    <button class="inter-medium button-border-green" @click="isActive.value = false">Cancel</button>
                    <p>{{ errorMessage }}</p>
                    <p>{{ sucessMessage }}</p>
                  </div>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </div>
        <h3 class="inter-medium font-size-20 font-color-green">
          Owner description
        </h3>
        <p class="inter-light font-size-18" v-if="user.owner_description">{{ user.owner_description }}</p>
        <p class="inter-light font-size-18" v-else>You dont't have a description yet! :(</p>
        <div id="buttons">
          <router-link :to="{ name: 'create-property' }" v-if="user.username == loggedUser"><button
              class="button-green inter-bold">
              Add new property
            </button></router-link>
          <router-link :to="{ name: 'properties' }"><button class="button-white inter-bold">
              See properties
            </button></router-link>
        </div>
      </div>
    </div>
    <div id="adminProfile" v-if="user.username == loggedUser && user.user_role == 'admin'">
      <div id="container">
        <h2 class="inter-medium font-size-24 font-color-green page-title">
          Admin fields
        </h2>
        <div class="btns">
          <router-link :to="{ name: 'view-users' }">
            <button class="button-green inter-bold btn">
              <Users :size="50"></Users>
              <p>See users</p>
            </button>
          </router-link>
          <router-link :to="{ name: 'view-properties' }">
            <button class="button-white inter-bold btn">
              <Home :size="50"></Home>
              <p>See properties</p>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Home from "vue-material-design-icons/Home.vue";
import Users from "vue-material-design-icons/AccountMultiple.vue";
import Edit from "vue-material-design-icons/Pencil.vue";
import { useUsersStore } from "@/stores/users";

export default {
  data() {
    return {
      usersStore: useUsersStore(),
      newName: "",
      newSurname: "",
      newUsername: "",
      newPhone: "",
      newDescription: "",
      sucessMessage: "",
      errorMessage: ""
    }
  },
  components: {
    Home,
    Users,
    Edit,
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    fetchUserData() {
      this.usersStore.fetchUser(this.$route.params.id)
      this.user = this.usersStore.getUser;
    },

    editProfile() {
      let fields = {};
      if (this.newName != "") fields.first_name = this.newName
      if (this.newSurname != "") fields.last_name = this.newSurname
      if (this.newUsername != "") fields.username = this.newUsername
      if (this.newPhone != "") fields.phone_number = this.newPhone
      if (this.newDescription != "") fields.owner_description = this.newDescription

      this.usersStore.editProfile(fields, this.loggedUser)
        .then(() => {
          if (this.newUsername != "") {
            this.$router.push({ name: 'profile', params: { id: this.newUsername } })
          }else{
            this.fetchUserData()
          }

          this.sucessMessage = 'Changes successful'
        })
        .catch((error) => {
          if (error == 'Error: API request failed with status 400: {"success":false,"msg":["PRIMARY must be unique"]}') {
            this.errorMessage = 'Username unavailable'
          } else {
            console.error('Error:', error);
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        });
    }
  },

  watch: {
    '$route.params.id': {
      immediate: true,
      handler() {
        this.fetchUserData();
      }
    },
  },

  computed: {
    user() {
      return this.usersStore.getUser
    },

    loggedUser() {
      return this.usersStore.getUserLogged
    }
  },
}
</script>

<style scoped>
#normalProfile {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 4fr;
  row-gap: 1em;
  column-gap: 2em;
}

#pictureProfile,
#usernameProfile,
#editDescription {
  display: flex;
  align-items: center;
  column-gap: 2em;
}

#editPhoto {
  background-color: #f5f5f5;
  border-radius: 8px;
  width: 9em;
  height: 2.5em;
}

#photoBtn,
#pictureProfile {
  display: flex;
  justify-content: center;
}

h3:not(.firstName) {
  margin-top: 1.5em;
}

#buttons {
  display: flex;
  flex-direction: row;
  column-gap: 2em;
  margin-top: 2em;
}

#ownerProfile,
#adminProfile {
  margin-top: 4em;
}

#container {
  border: #133e1a20 solid 1px;
  border-radius: 11px;
  padding: 2em;
}

.btns {
  display: flex;
  flex-direction: row;
  column-gap: 4rem;
}

.btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 8rem;
}

#inputs {
  display: flex;
  flex-direction: column;
}

input {
  width: 90%;
  border: #133e1a20 solid 1px;
  border-radius: 11px;
  padding: 0.5em;
  padding-left: 0.5em;
  border-radius: 5px;
  margin-bottom: 1.5em;
}

label {
  margin-bottom: 0.5em;
}

.modalTitle {
  color: #64748b;
  margin-top: 0.5em;
}

#newDescription {
  border: #133e1a20 solid 1px;
  border-radius: 11px;
  padding: 0.5em;
  padding-left: 0.5em;
  border-radius: 5px;
  margin-bottom: 1.5em;
}

#newDescription:focus,
input:focus {
  outline: none;
  border-color: #133e1a20;
}

.btnsModal {
  display: flex;
  flex-direction: row;
  padding: 0.5rem 1rem 0.13rem;
  column-gap: 1rem;
}

#sucessMessage {
  color: green;
}

#errorMessage {
  color: red;
}
</style>
