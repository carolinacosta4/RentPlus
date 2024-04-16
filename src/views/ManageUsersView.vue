<template>
  <main class="py-8 px-4">
    <h1 class="inter-medium font-color-green font-size-24 page-title">Users list</h1>
    <h2 class="inter-medium font-color-green font-size-18">Total users: {{ users.length }}</h2>
    <div id="filters">
      <input @click="changeFilterFlag('search')" type="text" placeholder="Search for user"
        class="inter-medium font-size-14" v-model="searchUsers">
      <div class="dropdown" @mouseover="toggleDropdown(true)">
        <div class="dropbtn">
          <Filter></Filter>
          <p class="inter-light font-color-green font-size-15">Filter</p>
        </div>
        <div v-if="isDropdownOpen" class="dropdownContent">
          <p @click="changeFilterFlag('admin')" class="inter-light font-size-14">Admin</p>
          <p @click="changeFilterFlag('guest')" class="inter-light font-size-14">Guest</p>
          <p @click="changeFilterFlag('owner')" class="inter-light font-size-14">Owner</p>
        </div>
      </div>
    </div>
    <div id="tableUsers">
      <table>
        <tr class="inter-medium font-color-green font-size-18">
          <th>Type</th>
          <th id="usernameColumn">
            <p>Username</p>
            <Sort></Sort>
          </th>
          <th>Joined on</th>
          <th>Actions</th>
        </tr>
        <tr v-for="user in filters" :key="user.username" class="inter-light font-color-black font-size-18">
          <td>{{ user.type }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.joined }}</td>
          <td id="buttons">
            <button id="blockBtn" class="inter-bold">Block</button>
            <v-dialog max-width="500">
              <template v-slot:activator="{ props: activatorProps }">
                <button id="deleteBtn" class="inter-bold" v-bind="activatorProps">Delete</button>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-card-text>
                    <h1 class="page-title font-size-18 inter-semiBold font-color-green">Are you absolutely sure?</h1>
                    <p class="inter-light font-size-14">This action cannot be undone. This will permanently delete this user's data from our servers.</p>
                  </v-card-text>

                  <v-card-actions id="containerBtn">
                    <div class="btnsModal">
                      <button class="inter-medium button-border-green" @click="isActive.value = false">Cancel</button>
                      <button class="inter-medium button-green" @click="deleteUser(user.username)">Continue</button>
                    </div>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </td>
        </tr>
      </table>
    </div>
    <router-link :to="{ name: 'profile' }"><button id="back" class="button-green inter-bold font-size-14">Go
        back</button></router-link>
  </main>
</template>

<script>
import Filter from "vue-material-design-icons/FilterVariant.vue";
import Sort from "vue-material-design-icons/Sort.vue";

export default {
  data() {
    return {
      users: [{
        type: "Guest",
        username: "carolina4",
        joined: "16-7-2024"
      },
      {
        type: "Admin",
        username: "alberto",
        joined: "16-7-2024"
      },
      {
        type: "Owner",
        username: "joaquim",
        joined: "16-7-2024"
      },
      ],
      searchUsers: "",
      isVisible: false,
      isDropdownOpen: false,
      filterFlag: "search"
    }
  },

  components: {
    Filter,
    Sort
  },

  computed: {
    filters() {
      if (this.filterFlag == "search") return this.users.filter((user) => user.username.toLowerCase().startsWith(this.searchUsers.toLowerCase()))
      if (this.filterFlag == "admin") return this.users.filter((user) => user.type == 'Admin');
      if (this.filterFlag == "guest") return this.users.filter((user) => user.type == 'Guest');
      if (this.filterFlag == "owner") return this.users.filter((user) => user.type == 'Owner');
    }
  },

  methods: {
    toggleBtn() {
      this.changeFilterFlag('search')
      return this.isVisible = !this.isVisible
    },

    toggleDropdown(isOpen) {
      this.isDropdownOpen = isOpen;
    },

    changeFilterFlag(change) {
      this.filterFlag = change
    },

    deleteUser(username){
      let index = this.users.findIndex((user) => user.username == username)
      this.users.splice(index, 1)
    }
  },
}
</script>

<style scoped>
table {
  border-collapse: separate;
  border: #133E1A20 solid 1px;
  width: 100%;
  border-radius: 5px;
}

td {
  border-top: #133E1A20 solid 1px;
}

#tableUsers {
  display: flex;
  justify-content: center;
}

th,
td {
  height: 3em;
  text-align: center;
}

input {
  color: #133E1A20;
  border: #133E1A20 solid 1px;
  padding: 0.5em;
  padding-left: 1.5em;
  border-radius: 5px;
  margin-top: 2em;
  margin-bottom: 1em;
  width: 20%;
}

#buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 2em;
}

#blockBtn {
  background-color: #696969;
  color: #F5F5F5;
  border-radius: 8px;
  width: 10em;
  height: 2.5em;
  font-size: 15px;
}

#deleteBtn {
  background-color: #FF0000;
  color: #F5F5F5;
  border-radius: 8px;
  width: 10em;
  height: 2.5em;
  font-size: 15px;
}

.dropbtn {
  display: flex;
  flex-direction: row;
  margin: 0 1em;
  align-items: center;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
}

.dropdown {
  position: relative;
  display: inline-block;
  text-align: right;
}

.dropdownContent {
  display: none;
  position: absolute;
  background-color: #E6E5E5;
  min-width: 160px;
  z-index: 1;
  top: 100%;
  border-radius: 10px;
  cursor: pointer;
}

.dropdownContent p {
  color: #133E1A;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 18px;
  text-align: center;
}

.dropdownContent p:hover {
  background-color: #133E1A;
  color: #E6E5E5;
  border-radius: 10px;
}

.dropdown:hover .dropdownContent {
  display: block;
}

#filters {
  display: flex;
  align-items: center;
}

#back {
  margin-top: 2em;
}

.btnsModal {
  display: flex;
  flex-direction: row;
  justify-content: right;
  padding: 0.5rem 1rem 0.13rem;
  column-gap: 1rem;
}

#containerBtn{
  display: block;
}

#usernameColumn{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 1em;
}
</style>