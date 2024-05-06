<template>
  <main class="py-8 px-4 flex flex-col">
    <h1 class="inter-medium font-color-green font-size-24 page-title">
      Your reservations
    </h1>

    <div>
      <p class="text-xl my-2 inter-light font-color-black font-size-20">Current</p>
      <hr />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 mb-4 gridCards"
      >
        <div class="cards">
          <div v-if="thisWeek.length <= 0" class="noDataDiv">
            <p>There are no current reservations</p>
            <SadFaceIcon class="font-color-green"></SadFaceIcon>
          </div>

          <div v-else class="displayCards">
            <ArrowLeft
              fillColor="#133E1A"
              @click="prevPage('this')"
              :disabled="currentPageThis == 0"
              v-if="thisWeek.length > pageSizeCards"
            />
            <CardReservations
              v-for="(card, index) in paginatedCardsThis"
              :key="index"
              :guest="card.guest"
              :property="card.property"
              :startDate="card.startDate"
              :endDate="card.endDate"
            />
            <ArrowRight
              fillColor="#133E1A"
              @click="nextPage('this')"
              :disabled="currentPageThis == currentPageThis - 1"
              v-if="thisWeek.length > pageSizeCards"
            />
          </div>
          <p class="font-size-14 inter-light font-color-green" style="text-align: center">
            {{ currentPageThis + 1 }} of {{ totalPagesThis }}
          </p>
        </div>
      </div>
    </div>

    <div>
      <p class="text-xl my-2 inter-light font-color-black font-size-20">Future</p>
      <hr />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 mb-4 gridCards"
      >
        <div class="cards">
          <div v-if="futureWeeks.length <= 0" class="noDataDiv">
            <p>There are no current reservations</p>
            <SadFaceIcon class="font-color-green"></SadFaceIcon>
          </div>

          <div v-else class="displayCards">
            <ArrowLeft
              fillColor="#133E1A"
              @click="prevPage('future')"
              :disabled="currentPageFuture == 0"
              v-if="futureWeeks.length > pageSizeCards"
            />
            <CardReservations
            v-for="(card, index) in paginatedCardsFuture"
            :key="index"
            :guest="card.guest"
            :property="card.property"
            :startDate="card.startDate"
            :endDate="card.endDate"
          />
          <ArrowRight
              fillColor="#133E1A"
              @click="nextPage('future')"
              :disabled="currentPageFuture == currentPageFuture - 1"
              v-if="futureWeeks.length > pageSizeCards"
            />
          </div>
          <p class="font-size-14 inter-light font-color-green" style="text-align: center">
            {{ currentPageFuture + 1 }} of {{ totalPagesFuture }}
          </p>
        </div>
      </div>
    </div>

    <div>
      <p class="text-xl my-2 inter-light font-color-black font-size-20">Previous</p>
      <hr />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 mb-4 gridCards"
      >
        <div class="cards">
          <div v-if="previousWeeks.length <= 0" class="noDataDiv">
          <p>There are no current reservations</p>
          <SadFaceIcon class="font-color-green"></SadFaceIcon>
        </div>

        <div class="displayCards">
          <ArrowLeft
              fillColor="#133E1A"
              @click="prevPage('previous')"
              :disabled="currentPagePrevious == 0"
              v-if="previousWeeks.length > pageSizeCards"
            />
          <CardReservations
          v-for="(card, index) in paginatedCardsPrevious"
          :key="index"
          :guest="card.guest"
          :property="card.property"
          :startDate="card.startDate"
          :endDate="card.endDate"
        />
        <ArrowRight
              fillColor="#133E1A"
              @click="nextPage('previous')"
              :disabled="currentPagePrevious == currentPagePrevious - 1"
              v-if="previousWeeks.length > pageSizeCards"
            />
        </div>
        <p class="font-size-14 inter-light font-color-green" style="text-align: center">
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

export default {
  components: {
    CardReservations,
    SadFaceIcon,
    ArrowLeft,
    ArrowRight,
  },
  data() {
    return {
      cards: [
        {
          guest: "Carlos",
          property: "Beautiful pent-house",
          startDate: "2024-05-05",
          endDate: "2024-05-20",
        },
        {
          guest: "Bernando",
          property: "Beautiful pent-house",
          startDate: "2025-05-05",
          endDate: "2025-05-20",
        },
        {
          guest: "Miguela",
          property: "Beautiful pent-house",
          startDate: "2024-05-01",
          endDate: "2024-05-20",
        },
        {
          guest: "Joana",
          property: "Beautiful pent-house",
          startDate: "2024-05-01",
          endDate: "2024-05-20",
        },
        {
          guest: "João",
          property: "Beautiful pent-house",
          startDate: "2024-04-01",
          endDate: "2024-04-05",
        },
        {
          guest: "Maria",
          property: "Beautiful pent-house",
          startDate: "2025-12-10",
          endDate: "2025-12-15",
        },
        {
          guest: "Ana",
          property: "Beautiful pent-house",
          startDate: "2024-04-12",
          endDate: "2024-04-25",
        },
        {
          guest: "Miguel",
          property: "Beautiful pent-house",
          startDate: "2024-02-15",
          endDate: "2024-02-20",
        },
      ],
      pageSizeCards: 2,
      currentPageThis: 0,
      currentPagePrevious: 0,
      currentPageFuture: 0,
    };
  },
  computed: {
    thisWeek() {
      const today = new Date();
      let week = this.cards.filter((card) => {
        const startDate = new Date(card.startDate);
        const endDate = new Date(card.endDate);
        return startDate <= today && endDate >= today;
      });
      return week;
    },
    futureWeeks() {
      const today = new Date();
      let futureWeeks = this.cards.filter((card) => {
        const startDate = new Date(card.startDate);
        const endDate = new Date(card.endDate);
        return startDate >= today && endDate >= today;
      });
      return futureWeeks;
    },
    previousWeeks() {
      const today = new Date();
      let previousWeeks = this.cards.filter((card) => {
        const startDate = new Date(card.startDate);
        const endDate = new Date(card.endDate);
        return startDate <= today && endDate <= today;
      });
      return previousWeeks;
    },
    paginatedCardsThis() {
      const startIndex = this.currentPageThis * this.pageSizeCards;
      const endIndex = startIndex + this.pageSizeCards;
      return this.thisWeek.slice(startIndex, endIndex);
    },
    totalPagesThis() {
      return Math.ceil(this.thisWeek.length / this.pageSizeCards);
    },
    paginatedCardsFuture() {
      const startIndex = this.currentPageFuture * this.pageSizeCards;
      const endIndex = startIndex + this.pageSizeCards;
      return this.futureWeeks.slice(startIndex, endIndex);
    },
    totalPagesFuture() {
      return Math.ceil(this.futureWeeks.length / this.pageSizeCards);
    },
    paginatedCardsPrevious() {
      const startIndex = this.currentPagePrevious * this.pageSizeCards;
      const endIndex = startIndex + this.pageSizeCards;
      return this.previousWeeks.slice(startIndex, endIndex);
    },
    totalPagesPrevious() {
      return Math.ceil(this.previousWeeks.length / this.pageSizeCards);
    },
  },
  methods: {
    nextPage(n) {
      if (n == "this") {
        if (this.currentPageThis < this.totalPagesThis - 1) {
          this.currentPageThis++;
        }
      } else if (n == "previous") {
        if (this.currentPagePrevious < this.totalPagesPrevious - 1) {
          this.currentPagePrevious++;
        }
      } else if (n== "future"){
        if (this.currentPageFuture < this.totalPagesFuture - 1) {
          this.currentPageFuture++;
        }
      }
    },
    prevPage(n) {
      if (n == "this") {
        if (this.currentPageThis > 0) {
          this.currentPageThis--;
        }
      } else if (n == "previous") {
        if (this.currentPagePrevious > 0) {
          this.currentPagePrevious--;
        }
      } else if (n== "future"){
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
