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
          v-for="(card, index) in cards"
          :key="index"
          :city="card.city"
          :country="card.country"
          :host="card.host"
          :startDate="card.startDate"
          :endDate="card.endDate"
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
          v-for="(card, index) in cards"
          :key="index"
          :city="card.city"
          :country="card.country"
          :host="card.host"
          :startDate="card.startDate"
          :endDate="card.endDate"
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
          v-for="(card, index) in cards"
          :key="index"
          :city="card.city"
          :country="card.country"
          :host="card.host"
          :startDate="card.startDate"
          :endDate="card.endDate"
        />
      </div>
    </div>
  </main>
</template>

<script>
import CardTrips from "@/components/CardTrips.vue";

export default {
  components: {
    CardTrips,
  },
  data() {
    return {
      cards: [
        {
          city: "Paris",
          country: "FR",
          host: "John",
          startDate: "2024-04-01",
          endDate: "2024-04-05",
        },
        {
          city: "Porto",
          country: "PT",
          host: "Maria",
          startDate: "2024-05-10",
          endDate: "2024-05-15",
        },
        {
          city: "Tokyo",
          country: "JP",
          host: "David",
          startDate: "2024-06-20",
          endDate: "2024-06-25",
        },
        {
          city: "New York",
          country: "US",
          host: "Emily",
          startDate: "2024-07-15",
          endDate: "2024-07-20",
        },
        {
          city: "London",
          country: "UK",
          host: "Michael",
          startDate: "2024-08-05",
          endDate: "2024-08-10",
        },
      ],
    };
  },
};
</script>
