<template>
  <main class="py-8 px-4 flex flex-col">
    <h1 class="inter-medium font-color-green font-size-24 page-title">
      Your reservations
    </h1>

    <!--  -->
    <!--  -->
    <!-- CURRENT -->
    <div>
      <p class="text-xl my-2 inter-light font-color-black font-size-20">
        Current
      </p>
      <hr />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 mb-4 gridCards"
      >
        <div class="cards">
          <div v-if="currentReservations.length <= 0" class="noDataDiv">
            <p>There are no current reservations</p>
            <SadFaceIcon class="font-color-green"></SadFaceIcon>
          </div>

          <div v-else class="displayCards">
            <ArrowLeft
              fillColor="#133E1A"
              @click="prevPage('this')"
              :disabled="currentPageCurrent == 0"
              v-if="currentReservations.length > pageSizeCards"
            />
            <CardReservations
              v-for="(card, index) in paginatedCardsCurrent"
              :key="index"
              :guest="`Max Guests: ${card.guests}`"
              :property="card.title"
              :startDate="card.dateIn"
              :endDate="card.DateOut"
            />
            <ArrowRight
              fillColor="#133E1A"
              @click="nextPage('this')"
              :disabled="currentPageCurrent == currentPageCurrent - 1"
              v-if="currentReservations.length > pageSizeCards"
            />
          </div>
          <p
            class="font-size-14 inter-light font-color-green"
            style="text-align: center"
          >
            {{ currentPageCurrent + 1 }} of {{ totalPagesCurrent }}
          </p>
        </div>
      </div>
    </div>

    <!--  -->
    <!--  -->
    <!-- FUTURE -->
    <div>
      <p class="text-xl my-2 inter-light font-color-black font-size-20">
        Future
      </p>
      <hr />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 mb-4 gridCards"
      >
        <div class="cards">
          <div v-if="futureReservations.length <= 0" class="noDataDiv">
            <p>There are no future reservations</p>
            <SadFaceIcon class="font-color-green"></SadFaceIcon>
          </div>

          <div v-else class="displayCards">
            <ArrowLeft
              fillColor="#133E1A"
              @click="prevPage('future')"
              :disabled="currentPageFuture == 0"
              v-if="futureReservations.length > pageSizeCards"
            />
            <CardReservations
              v-for="(card, index) in paginatedCardsFuture"
              :key="index"
              :guest="`Max Guests: ${card.guests}`"
              :property="card.title"
              :startDate="card.dateIn"
              :endDate="card.dateOut"
            />
            <ArrowRight
              fillColor="#133E1A"
              @click="nextPage('future')"
              :disabled="currentPageFuture == currentPageFuture - 1"
              v-if="futureReservations.length > pageSizeCards"
            />
          </div>
          <p
            class="font-size-14 inter-light font-color-green"
            style="text-align: center"
          >
            {{ currentPageFuture + 1 }} of {{ totalPagesFuture }}
          </p>
        </div>
      </div>
    </div>

    <!--  -->
    <!--  -->
    <!-- Previous -->
    <div>
      <p class="text-xl my-2 inter-light font-color-black font-size-20">
        Previous
      </p>
      <hr />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 mb-4 gridCards"
      >
        <div class="cards">
          <div v-if="previousReservations.length <= 0" class="noDataDiv">
            <p>There are no previous reservations</p>
            <SadFaceIcon class="font-color-green"></SadFaceIcon>
          </div>

          <div class="displayCards">
            <ArrowLeft
              fillColor="#133E1A"
              @click="prevPage('previous')"
              :disabled="currentPagePrevious == 0"
              v-if="previousReservations.length > pageSizeCards"
            />
            <CardReservations
              v-for="(card, index) in paginatedCardsPrevious"
              :key="index"
              :guest="`Max Guests: ${card.guests}`"
              :property="card.title"
              :startDate="card.dateIn"
              :endDate="card.dateOut"
            />
            <ArrowRight
              fillColor="#133E1A"
              @click="nextPage('previous')"
              :disabled="currentPagePrevious == currentPagePrevious - 1"
              v-if="previousReservations.length > pageSizeCards"
            />
          </div>
          <p
            class="font-size-14 inter-light font-color-green"
            style="text-align: center"
          >
            {{ currentPagePrevious + 1 }} of {{ totalPagesPrevious }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import CardReservations from "@/components/CardReservations.vue";
import SadFaceIcon from "vue-material-design-icons/EmoticonSadOutline.vue";
import ArrowLeft from "vue-material-design-icons/ArrowLeft.vue";
import ArrowRight from "vue-material-design-icons/ArrowRight.vue";
import { useUsersStore } from "@/stores/users";
import { usePropertiesStore } from "@/stores/properties";

export default {
  components: {
    CardReservations,
    SadFaceIcon,
    ArrowLeft,
    ArrowRight,
  },
  data() {
    return {
      userStore: useUsersStore(),
      propertiesStore: usePropertiesStore(),
      allReservations: [],
      currentReservations: [],
      futureReservations: [],
      previousReservations: [],
      pageSizeCards: 2,
      currentPageCurrent: 0,
      currentPagePrevious: 0,
      currentPageFuture: 0,
    };
  },

  async created() {
    await this.userStore.fetchUserReservations(localStorage.getItem("user"));
    this.allReservations = this.userStore.reservations;
    await this.fetchPropertyDetails();
    this.filterReservationsByDate();
  },

  computed: {
    paginatedCardsCurrent() {
      const startIndex = this.currentPageCurrent * this.pageSizeCards;
      const endIndex = startIndex + this.pageSizeCards;
      return this.currentReservations.slice(startIndex, endIndex);
    },
    totalPagesCurrent() {
      return Math.ceil(this.currentReservations.length / this.pageSizeCards);
    },
    paginatedCardsFuture() {
      const startIndex = this.currentPageFuture * this.pageSizeCards;
      const endIndex = startIndex + this.pageSizeCards;
      return this.futureReservations.slice(startIndex, endIndex);
    },
    totalPagesFuture() {
      return Math.ceil(this.futureReservations.length / this.pageSizeCards);
    },
    paginatedCardsPrevious() {
      const startIndex = this.currentPagePrevious * this.pageSizeCards;
      const endIndex = startIndex + this.pageSizeCards;
      return this.previousReservations.slice(startIndex, endIndex);
    },
    totalPagesPrevious() {
      return Math.ceil(this.previousReservations.length / this.pageSizeCards);
    },
  },

  methods: {
    async fetchPropertyDetails() {
      for (const reservation of this.allReservations) {
        const propertyDetails = await this.propertiesStore.fetchProperty(
          reservation.property_ID
        );
        reservation.title = propertyDetails.title;
        reservation.guests = propertyDetails.guest_number;
      }
    },

    filterReservationsByDate() {
      const currentDate = new Date();
      this.currentReservations = this.allReservations.filter((reservation) => {
        const startDate = new Date(reservation.dateIn);
        const endDate = new Date(reservation.dateOut);
        return endDate >= currentDate && startDate <= currentDate;
      });

      this.futureReservations = this.allReservations.filter((reservation) => {
        const startDate = new Date(reservation.dateIn);
        return startDate > currentDate;
      });

      this.previousReservations = this.allReservations.filter((reservation) => {
        const endDate = new Date(reservation.dateOut);
        return endDate < currentDate;
      });
    },

    nextPage(type) {
      if (type == "current") {
        if (this.currentPageThis < this.totalPagesThis - 1) {
          this.currentPageThis++;
        }
      } else if (type == "previous") {
        if (this.currentPagePrevious < this.totalPagesPrevious - 1) {
          this.currentPagePrevious++;
        }
      } else if (type == "future") {
        if (this.currentPageFuture < this.totalPagesFuture - 1) {
          this.currentPageFuture++;
        }
      }
    },

    prevPage(type) {
      if (type == "current") {
        if (this.currentPageThis > 0) {
          this.currentPageThis--;
        }
      } else if (type == "previous") {
        if (this.currentPagePrevious > 0) {
          this.currentPagePrevious--;
        }
      } else if (type == "future") {
        if (this.currentPageFuture < this.totalPagesFuture - 1) {
          this.currentPageFuture--;
        }
      }
    },
  },
};
</script>

<style>
.noDataDiv {
  display: flex;
  flex-direction: row;
  column-gap: 0.5em;
}

.displayCards {
  display: flex;
  flex-direction: row;
  column-gap: 5em;
  align-items: center;
}

.gridCards {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
