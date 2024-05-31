<template>
  <main class="py-8 px-4">
    <h1 class="inter-medium font-color-green font-size-24 page-title">Saved</h1>
    <nav id="saved" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <div v-for="property in properties" :key="property.name">
        <PropertyContainer :image='property.image' :name='property.name' :location='property.location'
          :price='property.price' :id="26"/>
      </div>
    </nav>
  </main>
</template>

<script>
import PropertyContainer from '../components/PropertyContainer.vue';

export default {
  data() {
    return {
      properties: [
        {
          image: "https://via.placeholder.com/200x200",
          name: "Beautiful pent-house",
          location: "Porto, PT",
          price: 25
        },
        {
          image: "https://via.placeholder.com/200x200",
          name: "Beautiful pent-house",
          location: "Lisbon, PT",
          price: 45
        },
        {
          image: "https://via.placeholder.com/200x200",
          name: "Beautiful pent-house",
          location: "Porto, PT",
          price: 25
        },
        {
          image: "https://via.placeholder.com/200x200",
          name: "Beautiful pent-house",
          location: "Lisbon, PT",
          price: 45
        },
        {
          image: "https://via.placeholder.com/200x200",
          name: "Beautiful pent-house",
          location: "Porto, PT",
          price: 25
        },
        {
          image: "https://via.placeholder.com/200x200",
          name: "Beautiful pent-house",
          location: "Lisbon, PT",
          price: 45
        },
      ]
    }
  },

  components: {
    PropertyContainer,
  }
}
</script>

<style scoped>
#saved {
  row-gap: 2em;
}
</style>
