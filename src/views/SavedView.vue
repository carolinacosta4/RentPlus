<template>
  <main class="py-8 px-4">
    <h1 class="inter-medium font-color-green font-size-24 page-title">Saved</h1>
    <div v-if="properties && properties.length > 0">
      <nav
        id="saved"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        <div v-for="property in properties" :key="property.ID">
          <PropertyContainer
            :id="property.ID"
            :image="getPropertyImage(property)"
            :name="property.title"
            :location="property.location"
            :price="property.daily_price"
            :bookmark = true
          />
        </div>
      </nav>
    </div>
    <div v-else>
      <p>No properties saved.</p>
      <router-link :to="{ name: 'home' }">
        <button class="py-3 px-4 bg-gray-800 text-white mt-4 rounded-lg">
          Check Some Properties
        </button>
      </router-link>
    </div>
  </main>
</template>



<script>
import PropertyContainer from "../components/PropertyContainer.vue";
import { useUsersStore } from "@/stores/users";
import { usePropertiesStore } from "@/stores/properties";

export default {
  data() {
    return {
      usersStore: useUsersStore(),
      propertiesStore: usePropertiesStore(),
      favProperties: [],
    };
  },

  async created() {
    this.usersStore.fetchUser(this.loggedUser).then(() => {
      this.usersStore.getUser.favorites.forEach((fav) => {
        this.propertiesStore.fetchProperty(fav.property_ID).then(() => {
          this.favProperties.push(this.propertiesStore.getProperty);
        });
      });
    });
  },

  computed: {
    properties() {
      return this.favProperties;
    },

    loggedUser(){
      return localStorage.getItem('user')
    }
  },

  methods: {
    getPropertyImage(property) {
      if (property?.photos?.photo && property.photos.photo.length > 0) {
        return property.photos.photo[0];
      }
      return `https://placehold.co/200x200?text=No%20Image%20for%0A${property.title}`;
    },
  },

  components: {
    PropertyContainer,
  },
};
</script>

<style scoped>
#saved {
  row-gap: 2em;
}
</style>
