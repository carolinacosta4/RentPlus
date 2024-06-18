<template>
  <main class="py-8 px-4">
    <!-- TOP -->
    <div class="flex flex-col lg:flex-row justify-between">
      <div>
        <p class="mb-4 inter-semiBold font-color-green">
          Find the perfect spot for your holidays
        </p>
        <div class="flex gap-8 mb-6 border px-6 py-2 rounded-lg w-fit">
          <!-- Location input -->
          <input class="w-4/12 focus:outline-none inter-light font-color-green" type="text" placeholder="Location"
            v-model="location" />

          <!-- Guests input -->
          <input class="w-3/12 focus:outline-none inter-light font-color-green" type="text" placeholder="Guests"
            v-model="guests" />

          <button class="flex justify-center items-center w-8 h-8 p-5 bg-gray-200 rounded-lg"
            @click="changeFilterFlag('searchBoth')">
            <SearchIcon />
          </button>

          <button class="flex justify-center items-center w-8 h-8 p-5 bg-gray-200 rounded-lg" @click="sort">
            <FilterIcon />
          </button>
        </div>
      </div>
      <!-- BOTTOM -->
      <div>
        <p class="mb-4 inter-semiBold font-color-green">Find specifics</p>
        <div class="relative mb-16 flex items-center gap-3">
          <input class="focus:outline-none border px-6 py-3 rounded-lg inter-light font-color-green" type="text"
            placeholder="Search" v-model="title" @click="changeFilterFlag('searchTitle')" />
        </div>
      </div>
    </div>

    <!-- CARDS -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <div v-for="property in filters" :key="property.ID">
        <PropertyContainer :image="property.photo"
          :name="property.title" :location="property.location" :price="property.daily_price" :id="property.ID"
          :bookmark="isFavorite(property.ID)" />
      </div>
    </div>

    <div id="pagination" class="inter-medium" v-if="pagination.total > 2 && pagination.limit != null">
      <ArrowLeft @click="propertiesStore.fetchProperties(pagination.current - 1)" v-if="pagination.current != 1">
      </ArrowLeft>
      <span>{{ pagination.current }}</span> of <span>{{ pagination.totalPages }}</span>
      <ArrowRight @click="propertiesStore.fetchProperties(pagination.current + 1)"
        v-if="pagination.current != pagination.totalPages"></ArrowRight>
    </div>
  </main>
</template>


<script>
import FilterIcon from "vue-material-design-icons/Filter.vue";
import SearchIcon from "vue-material-design-icons/Magnify.vue";
import PropertyContainer from "../components/PropertyContainer.vue";
import ArrowLeft from "vue-material-design-icons/ArrowLeft.vue";
import ArrowRight from "vue-material-design-icons/ArrowRight.vue";
import { usePropertiesStore } from "@/stores/properties";
import { useUsersStore } from "@/stores/users";

export default {
  components: {
    FilterIcon,
    SearchIcon,
    PropertyContainer,
    ArrowLeft,
    ArrowRight,
  },
  data() {
    return {
      propertiesStore: usePropertiesStore(),
      userStore: useUsersStore(),
      location: "",
      guests: "",
      title: "",
      selectedDate: "",
      filterFlag: "search",
      sortFlag: -1,
    };
  },

  async created() {
    this.propertiesStore.fetchProperties(1);
  },

  computed: {
    properties() {
      return this.propertiesStore.getProperties
    },

    pagination() {
      return this.propertiesStore.getPagination
    },

    filters() {
      let filtered = this.properties.filter(property => !property.is_blocked)
      if (this.filterFlag == "search") { return filtered }
      if (this.filterFlag == 'searchBoth') {
        if (this.location == "" && this.guests == "") { return filtered }
        if (this.location == "") { filtered = filtered.filter((property) => property.guest_number == this.guests) }
        if (this.guests == "") { filtered = filtered.filter((property) => property.location.toLowerCase().startsWith(this.location.toLowerCase())) }
        if (this.location != "" && this.guests != "") { filtered = filtered.filter((property) => property.location.toLowerCase().includes(this.location.toLowerCase()) && property.guest_number == this.guests) }
      }
      if (this.filterFlag == "searchTitle") { filtered = filtered.filter((property) => property.title.toLowerCase().includes(this.title.toLowerCase())) }
      return filtered
    },

    sortPrice() {
      this.properties.sort(
        (c1, c2) => {
          if (c1.daily_price > c2.daily_price) return 1 * this.sortFlag
          if (c1.daily_price < c2.daily_price) return -1 * this.sortFlag
          if (c1.daily_price == c2.daily_price) return 0
        })
    },

    loggedUser() {
      localStorage.getItem('user')
    }
  },

  methods: {
    changeFilterFlag(change) {
      this.filterFlag = change
      if (change !== 'search') {
        this.propertiesStore.fetchProperties(1);
      }
    },

    sort() {
      this.sortFlag *= -1
      this.sortPrice
    },

    isFavorite(propertyId) {
      return this.userStore.getUserLoggedInfo.favorites?.some((fav) => fav.property_ID === propertyId)
    },
  },
}
</script>

<style scoped>
#pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 0.5rem;
  color: #133E1A50;
  margin-top: 1em;
}
</style>