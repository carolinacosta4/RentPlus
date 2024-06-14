<template>
  <main class="py-8 px-4">
    <h1 class="inter-medium font-color-green font-size-24 page-title">Your properties</h1>
    <nav id="properties" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
      <div v-for="property in properties" :key="property.ID">
        <PropertyContainer :id="property.ID" :image="getPropertyImage(property)" :name="property.title"
          :location="property.location" :price="property.daily_price" />
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
      favProperties: [],
    };
  },

  created() {
    this.usersStore.fetchUser("Beatriz").then(() => {
      this.usersStore.getUser.properties.forEach((property) => {
        this.propertiesStore
          /* MUDAR NA BD NO FUTURO GUARDAR POR IDS E NAO NOMES */
          .fetchProperty(26 /* property.property_ID */)
          .then(() => {
            this.favProperties.push(this.propertiesStore.getProperty);
          });
      });
    });
  },

  computed: {
    properties() {
      return this.favProperties;
    },
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
