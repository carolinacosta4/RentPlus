<template>
  <main class="py-8 px-4">
    <h1 class="inter-medium font-color-green font-size-24 page-title">
      Your properties
    </h1>
    <nav
      id="properties"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      <div v-for="property in properties" :key="property.ID">
        <PropertyContainer
          :id="property.ID"
          :image="getPropertyImage(property)"
          :name="property.title"
          :location="property.location"
          :price="property.daily_price"
        />
      </div>
    </nav>
  </main>
</template>

<script>
import { usePropertiesStore } from "@/stores/properties";
import PropertyContainer from "../components/PropertyContainer.vue";
export default {
  data() {
    return {
      propertiesStore: usePropertiesStore(),
    };
  },

  created() {
    this.propertiesStore.fetchProperties().then(() => {
      console.log(this.propertiesStore.getProperties);
    });
  },

  methods: {
    getPropertyImage(property) {
      if (property?.photos?.photo && property.photos.photo.length > 0) {
        return property.photos.photo[0];
      }
      return `https://placehold.co/200x200?text=No%20Image%20for%0A${property.title}`;
    },
  },

  computed: {
    properties() {
      return this.propertiesStore.getProperties;
    },
  },

  components: {
    PropertyContainer,
  },
};
</script>

<style scoped>
#properties {
  row-gap: 2em;
}
</style>