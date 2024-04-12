<template>
  <main class="py-8 px-4">
    <h1 class="inter-medium font-color-green font-size-24 page-title">Properties list</h1>
    <h2 class="inter-medium font-color-green font-size-18">Total properties: {{ properties.length }}</h2>
    <div id="filters">
      <input @click="changeFilterFlag('search')" type="text" placeholder="Search for property"
        class="inter-medium font-size-14" v-model="searchUsers">
      <div class="dropdown" @mouseover="toggleDropdown(true)">
        <div class="dropbtn">
          <p class="inter-light font-color-green font-size-15">Filter</p>
        </div>
        <div v-if="isDropdownOpen" class="dropdownContent">
          <p v-for="property in properties" @click="changeFilterFlag(property.type)" class="inter-light font-size-14">{{ property.type }}</p>
        </div>
      </div>
    </div>
    <div id="tableUsers">
      <table>
        <tr class="inter-medium font-color-green font-size-18">
          <th>ID</th>
          <th>Type</th>
          <th>Title</th>
          <th>Created at</th>
          <th>Actions</th>
        </tr>
        <tr v-for="property in filters" :key="property.username" class="inter-light font-color-black font-size-18">
          <td>{{ property.id }}</td>
          <td>{{ property.type }}</td>
          <td>{{ property.title }}</td>
          <td>{{ property.created }}</td>
          <td id="buttons">
            <button id="blockBtn" class="inter-bold">Block</button>
            <button id="deleteBtn" class="inter-bold">Delete</button>
          </td>
        </tr>
      </table>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      properties: [{
        id: 1,
        type: "Pent-house",
        title: "Beautiful pent house",
        created: "16-7-2024"
      },
      {
        id: 2,
        type: "Beach-house",
        title: "Beautiful pent house", 
        created: "16-7-2024"
      },
      {
        id: 3,
        type: "Igloo",
        title: "Beautiful pent house", 
        created: "16-7-2024"
      },
      ],
      searchUsers: "",
      isVisible: false,
      isDropdownOpen: false,
      filterFlag: "search"
    }
  },

  computed: {
    filters() {
      if (this.filterFlag == "search") return this.properties.filter((property) => property.title.toLowerCase().startsWith(this.searchUsers.toLowerCase()))
      if (this.filterFlag) return this.properties.filter((property) => property.type == this.filterFlag);
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
}

.dropbtn {
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
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

/* #filters{
  display: grid;
  grid-template-columns: 4fr 1fr;
} */
</style>