<template>
  <main class="py-8 px-4">
    <h1 class="inter-medium font-color-green font-size-24 page-title">Your properties</h1>
    <nav id="properties" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
      <div v-for="property in properties" :key="property.ID">
        <PropertyContainer :id="property.ID" :image="getPropertyImage(property)" :name="property.title"
          :location="property.location" :price="property.daily_price" :blocked="property.is_blocked" />
      </div>
    </nav>
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
    };
  },

  created() {
    this.usersStore.fetchUser(`${this.loggedUser}?field=properties`)
  },

  computed: {
    properties() {
      console.log(this.usersStore.getUser.properties);
      return this.usersStore.getUser.properties
    },

    loggedUser() {
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
#Properties {
  row-gap: 2em;
}
</style>
