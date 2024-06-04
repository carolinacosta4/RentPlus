<template>
  <main class="py-8 px-4 md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-8">
    <div id="normalProfile">
      <div id="pictureProfile">
        <img class="w-40 h-40 rounded-full"
          src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
          alt="user photo" />
      </div>
      <div id="usernameProfile">
        <h1 class="inter-medium font-size-32 font-color-green">carolina04</h1>
        <v-dialog max-width="500">
          <template v-slot:activator="{ props: activatorProps }">
            <Edit fillColor="#133E1A" v-bind="activatorProps"></Edit>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card>
              <v-card-text>
                <h1 class="page-title font-size-14 modalTitle inter-light">Edit your profile</h1>
                <div id="inputs">
                  <label class="inter-medium">Name</label>
                  <input class="inter-medium" type="text" v-model="newName">

                  <label class="inter-medium">Surname</label>
                  <input type="text" v-model="newSurname">

                  <label class="inter-medium">Username</label>
                  <input class="inter-medium" type="text" v-model="newUsername">

                  <label class="inter-medium">Phone Number</label>
                  <input class="inter-medium" type="text" v-model="newPhone">
                </div>
              </v-card-text>

              <v-card-actions>
                <div class="btnsModal">
                  <button class="inter-medium button-green">Save changes</button>
                  <button class="inter-medium button-border-green" @click="isActive.value = false">Cancel</button>
                </div>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </div>
      <div id="photoBtn">
        <button class="font-color-green inter-bold button-white" @click="triggerFileInput">Change photo</button> 
        <!-- AQUI -->
        <input type="file" ref="fileInput" name="inputProfilePicture" style="display: none" />
      </div>
      <div id="infoProfile">
        <h3 class="inter-medium font-size-20 firstName font-color-green">First name</h3>
        <p class="inter-light font-size-20">Carolina</p>
        <h3 class="inter-medium font-size-20 font-color-green">Last name</h3>
        <p class="inter-light font-size-20">Costa</p>
        <h3 class="inter-medium font-size-20 font-color-green">Phone number</h3>
        <p class="inter-light font-size-20">+3519930993</p>
        <h3 class="inter-medium font-size-20 font-color-green">Email</h3>
        <p class="inter-light font-size-20">40220116@gmail.com</p>
      </div>
    </div>
    <div id="ownerProfile">
      <div id="container">
        <div id="editDescription">
          <h2 class="inter-medium font-size-24 font-color-green">Owner fields</h2>
          <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <Edit fillColor="#133E1A" v-bind="activatorProps"></Edit>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card>
                <v-card-text>
                  <h1 class="page-title font-size-14 modalTitle inter-light">Edit your profile description</h1>
                  <div id="inputs">
                    <label class="inter-medium">Description</label>
                    <textarea name="newDescription" class="inter-medium" cols="30" rows="10" id="newDescription"
                      v-model="newDescription"></textarea>
                  </div>
                </v-card-text>

                <v-card-actions>
                  <div class="btnsModal">
                    <button class="inter-medium button-green">Save changes</button>
                    <button class="inter-medium button-border-green" @click="isActive.value = false">Cancel</button>
                  </div>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </div>
        <h3 class="inter-medium font-size-20 font-color-green">Owner description</h3>
        <p class="inter-light font-size-18">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mi arcu,
          bibendum
          vitae fringilla aliquet, hendrerit et nisi. Mauris tincidunt, sem id semper fringilla, leo elit suscipit nibh,
          non
          mollis tellus lacus ac nunc. In in tellus sollicitudin, dictum enim ut, scelerisque massa. Nullam rutrum
          elementum
          congue.</p>
        <div id="buttons">
          <router-link :to="{ name: 'create-property' }"><button class="button-green inter-bold">Add new property</button></router-link>
          <router-link :to="{ name: 'properties' }"><button class="button-white inter-bold">See properties</button></router-link>
        </div>
      </div>
    </div>
    <div id="adminProfile">
      <div id="container">
        <h2 class="inter-medium font-size-24 font-color-green page-title">Admin fields</h2>
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



export default {
  components: {
    Home,
    Users,
    Edit
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
  }
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
  background-color: #F5F5F5;
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
  border: #133E1A20 solid 1px;
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
  border: #133E1A20 solid 1px;
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
  color: #64748B;
  margin-top: 0.5em;
}

#newDescription {
  border: #133E1A20 solid 1px;
  border-radius: 11px;
  padding: 0.5em;
  padding-left: 0.5em;
  border-radius: 5px;
  margin-bottom: 1.5em;
}

#newDescription:focus,
input:focus {
  outline: none;
  border-color: #133E1A20;
}

.btnsModal {
  display: flex;
  flex-direction: row;
  padding: 0.5rem 1rem 0.13rem;
  column-gap: 1rem;
}
</style>
