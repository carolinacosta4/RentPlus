<template>
  <main class="py-24 px-6 lg:px-12 lg:py-32">
    <!-- Input area -->
    <p class="mb-4">Find the perfect spot for your holidays</p>
    <div class="flex gap-4 mb-6 border px-6 py-2 rounded-lg w-fit">
      <!-- Location input -->
      <input
        class="w-4/12 focus:outline-none"
        type="text"
        placeholder="Location"
      />

      <!-- Date input -->
      <input
        class="w-3/12 border-x px-4"
        type="date"
        :value="new Date().toISOString().slice(0, 10)"
      />

      <!-- Guests input -->
      <input
        class="w-3/12 focus:outline-none"
        type="number"
        placeholder="Guests"
        max="100"
      />

      <button
        class="flex justify-center items-center w-8 h-8 p-5 bg-gray-200 rounded-lg"
      >
        <SearchIcon />
      </button>

      <button
        class="flex justify-center items-center w-8 h-8 p-5 bg-gray-200 rounded-lg"
      >
        <FilterIcon />
      </button>
    </div>

    <p class="mb-4">Find specifics</p>
    <div class="relative mb-16 flex items-center gap-3">
      <input
        class="focus:outline-none border px-6 py-3 rounded-lg"
        type="text"
        placeholder="Search"
      />
      <button
        class="flex justify-center items-center w-8 h-8 p-5 bg-gray-200 rounded-lg"
      >
        <SearchIcon />
      </button>
    </div>

    <!-- CARDS -->
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
    >
      <Card
        v-for="property in properties"
        :key="property.id"
        :property="property"
      />
    </div>
  </main>
</template>


<script>
import FilterIcon from "vue-material-design-icons/Filter.vue";
import SearchIcon from "vue-material-design-icons/Magnify.vue";
import Card from "../components/Card.vue";

export default {
  components: {
    FilterIcon,
    SearchIcon,
    Card,
  },
  data() {
    return {
      properties: [
        {
          id: 1,
          image: "https://via.placeholder.com/400x400",
          title: "Beautiful Penthouse",
          location: "Porto, PT",
          price: 25,
        },
        {
          id: 2,
          image: "https://via.placeholder.com/400x400",
          title: "Cozy Apartment",
          location: "Lisbon, PT",
          price: 30,
        },
        {
          id: 3,
          image: "https://via.placeholder.com/400x400",
          title: "Seaside Villa",
          location: "Algarve, PT",
          price: 50,
        },
        {
          id: 4,
          image: "https://via.placeholder.com/400x400",
          title: "Beautiful Penthouse",
          location: "Porto, PT",
          price: 25,
        },
        {
          id: 5,
          image: "https://via.placeholder.com/400x400",
          title: "Cozy Apartment",
          location: "Lisbon, PT",
          price: 30,
        },
        {
          id: 6,
          image: "https://via.placeholder.com/400x400",
          title: "Seaside Villa",
          location: "Algarve, PT",
          price: 50,
        },
        {
          id: 7,
          image: "https://via.placeholder.com/400x400",
          title: "Beautiful Penthouse",
          location: "Porto, PT",
          price: 25,
        },
        {
          id: 8,
          image: "https://via.placeholder.com/400x400",
          title: "Cozy Apartment",
          location: "Lisbon, PT",
          price: 30,
        },
        {
          id: 9,
          image: "https://via.placeholder.com/400x400",
          title: "Seaside Villa",
          location: "Algarve, PT",
          price: 50,
        },
      ],
    };
  },
};
</script>
