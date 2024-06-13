<template>
  <main class="py-8 px-4 flex flex-col">
    <h1 class="inter-medium font-color-green font-size-24 page-title">
      Your Trips
    </h1>

    <!-- CURRENT -->
    <div>
      <p class="text-xl my-2 inter-light font-color-black font-size-20">
        Current
      </p>
      <hr />
      <!-- Cards -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 mb-4"
      >
        <CardTrips
          v-for="(card, index) in currentTrips"
          :key="index"
          :city="card.city"
          :country="card.country"
          :host="card.host"
          :startDate="formatDate(card.dateIn)"
          :endDate="formatDate(card.dateOut)"
        />
      </div>
    </div>

    <!-- FUTURE -->

    <div>
      <p class="text-xl my-2 inter-light font-color-black font-size-20">
        Future
      </p>
      <hr />
      <!-- Cards -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 mb-4"
      >
        <CardTrips
          v-for="(card, index) in futureTrips"
          :key="index"
          :city="card.city"
          :country="card.country"
          :host="card.host"
          :startDate="formatDate(card.dateIn)"
          :endDate="formatDate(card.dateOut)"
        />
      </div>
    </div>

    <!-- PREVIOUS -->

    <div>
      <p class="text-xl my-2 inter-light font-color-black font-size-20">
        Previous
      </p>
      <hr />
      <!-- Cards -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 mb-4"
      >
        <CardTrips
          v-for="(card, index) in previousTrips"
          :key="index"
          :city="card.city"
          :country="card.country"
          :host="card.host"
          :startDate="formatDate(card.dateIn)"
          :endDate="formatDate(card.dateOut)"
        />
      </div>
    </div>
  </main>
</template>

<script>
import CardTrips from "@/components/CardTrips.vue";
import { useReservationsStore } from "@/stores/reservations";
import { usePropertiesStore } from "@/stores/properties";

export default {
  components: {
    CardTrips,
  },
  data() {
    return {
      reservationsStore: useReservationsStore(),
      propertiesStore: usePropertiesStore(),
      allTrips: [],
      currentTrips: [],
      futureTrips: [],
      previousTrips: [],
    };
  },

  async created() {
    await this.reservationsStore.getUserTrips(localStorage.getItem("user"));
    this.allTrips = this.reservationsStore.userTrips;
    await this.fetchPropertyDetails();
    this.filterTripsByDate();
  },

  methods: {
    async fetchPropertyDetails() {
      for (const trip of this.allTrips) {
        const propertyDetails = await this.propertiesStore.fetchProperty(
          trip.property_ID
        );
        // Extract city, country, and host from property details and update trip object
        trip.city = propertyDetails.location.split(",")[0].trim();
        trip.country = propertyDetails.location.split(",")[1].trim();
        trip.host = propertyDetails.owner_username;
      }
    },

    filterTripsByDate() {
      const currentDate = new Date();
      this.currentTrips = this.allTrips.filter((trip) => {
        const startDate = new Date(trip.dateIn);
        const endDate = new Date(trip.dateOut);
        return endDate >= currentDate && startDate <= currentDate;
      });

      this.futureTrips = this.allTrips.filter((trip) => {
        const startDate = new Date(trip.dateIn);
        return startDate > currentDate;
      });

      this.previousTrips = this.allTrips.filter((trip) => {
        const endDate = new Date(trip.dateOut);
        return endDate < currentDate;
      });
    },

    formatDate(dateString) {
      const options = { day: "numeric", month: "long", year: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("en-EN", options);
    },
  },
};
</script>
