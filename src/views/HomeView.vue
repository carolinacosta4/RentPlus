<template>
    <main class="py-8 px-4">
    <!-- Input area -->
    <p class="mb-4 inter-semiBold font-color-green">Find the perfect spot for your holidays</p>
    <div class="flex gap-4 mb-6 border px-6 py-2 rounded-lg w-fit">
      <!-- Location input -->
      <input
        class="w-4/12 focus:outline-none inter-light font-color-green"
        type="text"
        placeholder="Location"
      />

      <!-- Date input -->
      <input
        class="w-3/12 border-x px-4 inter-light font-color-green"
        type="date"
        :value="new Date().toISOString().slice(0, 10)"
      />

      <!-- Guests input -->
      <input
        class="w-3/12 focus:outline-none inter-light font-color-green"
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

    <p class="mb-4 inter-semiBold font-color-green">Find specifics</p>
    <div class="relative mb-16 flex items-center gap-3">
      <input
        class="focus:outline-none border px-6 py-3 rounded-lg inter-light font-color-green"
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
    <div v-for='property in properties'>
      <PropertyContainer :image='property.image' :name='property.title' :location='property.location' :price='property.price'/>
    </div>
    </div>
  </main>
</template>


<script>
import FilterIcon from "vue-material-design-icons/Filter.vue";
import SearchIcon from "vue-material-design-icons/Magnify.vue";
import PropertyContainer from '../components/PropertyContainer.vue';


export default {
  components: {
    FilterIcon,
    SearchIcon,
    PropertyContainer
  },
  data() {
    return {
      properties: [
        {
          id: 1,
          image: "https://via.placeholder.com/200x200",
          title: "Beautiful Penthouse",
          location: "Porto, PT",
          price: 25,
        },
        {
          id: 2,
          image: "https://via.placeholder.com/200x200",
          title: "Cozy Apartment",
          location: "Lisbon, PT",
          price: 30,
        },
        {
          id: 3,
          image: "https://via.placeholder.com/200x200",
          title: "Seaside Villa",
          location: "Algarve, PT",
          price: 50,
        },
        {
          id: 4,
          image: "https://via.placeholder.com/200x200",
          title: "Beautiful Penthouse",
          location: "Porto, PT",
          price: 25,
        },
        {
          id: 5,
          image: "https://via.placeholder.com/200x200",
          title: "Cozy Apartment",
          location: "Lisbon, PT",
          price: 30,
        },
        {
          id: 6,
          image: "https://via.placeholder.com/200x200",
          title: "Seaside Villa",
          location: "Algarve, PT",
          price: 50,
        },
        {
          id: 7,
          image: "https://via.placeholder.com/200x200",
          title: "Beautiful Penthouse",
          location: "Porto, PT",
          price: 25,
        },
        {
          id: 8,
          image: "https://via.placeholder.com/200x200",
          title: "Cozy Apartment",
          location: "Lisbon, PT",
          price: 30,
        },
        {
          id: 9,
          image: "https://via.placeholder.com/200x200",
          title: "Seaside Villa",
          location: "Algarve, PT",
          price: 50,
        },
      ],
    };
  },
};
</script>
