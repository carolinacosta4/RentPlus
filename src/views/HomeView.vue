<template>
  <main class="py-8 px-4">
    <!-- TOP -->
    <div class="flex flex-col lg:flex-row justify-between">
      <div>
        <p class="mb-4 inter-semiBold font-color-green">
          Find the perfect spot for your holidays
        </p>
        <div class="flex gap-4 mb-6 border px-6 py-2 rounded-lg w-fit">
          <!-- Location input -->
          <input class="w-4/12 focus:outline-none inter-light font-color-green" type="text" placeholder="Location" />

          <!-- Date input -->
          <input class="w-3/12 border-x px-4 inter-light font-color-green" type="date"
            :value="new Date().toISOString().slice(0, 10)" />

          <!-- Guests input -->
          <input class="w-3/12 focus:outline-none inter-light font-color-green" type="number" placeholder="Guests"
            max="100" />

          <button class="flex justify-center items-center w-8 h-8 p-5 bg-gray-200 rounded-lg">
            <SearchIcon />
          </button>

          <button class="flex justify-center items-center w-8 h-8 p-5 bg-gray-200 rounded-lg">
            <FilterIcon />
          </button>
        </div>
      </div>
      <!-- BOTTOM -->
      <div>
        <p class="mb-4 inter-semiBold font-color-green">Find specifics</p>
        <div class="relative mb-16 flex items-center gap-3">
          <input class="focus:outline-none border px-6 py-3 rounded-lg inter-light font-color-green" type="text"
            placeholder="Search" />
          <button class="flex justify-center items-center w-8 h-8 p-5 bg-gray-200 rounded-lg">
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>

    <!-- CARDS -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <div v-for="property in properties" :key="property.ID">
        <PropertyContainer image="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
          :name="property.title" :location="property.location" :price="property.daily_price" :id="property.ID" />
      </div>
    </div>
  </main>
</template>


<script>
import FilterIcon from "vue-material-design-icons/Filter.vue";
import SearchIcon from "vue-material-design-icons/Magnify.vue";
import PropertyContainer from "../components/PropertyContainer.vue";
import { usePropertiesStore } from "@/stores/properties";

export default {
  components: {
    FilterIcon,
    SearchIcon,
    PropertyContainer,
  },
  data() {
    return {
      propertiesStore: usePropertiesStore(),
    };
  },

  created() {
    this.propertiesStore.fetchProperties();
  },

  computed: {
    properties() {
      return this.propertiesStore.getProperties
    }
  },
};
</script>
