<template>
  <main class="py-8 px-4 flex flex-col">
    <h1 class="inter-medium font-color-green font-size-24 page-title">
      Your reservations
    </h1>

    <div>
      <p class="text-xl my-2 inter-light font-color-black font-size-20">This week</p>
      <hr />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 mb-4"
      >
        <div v-if="thisWeek.length <= 0" class="noDataDiv">
          <p>There are no current reservations</p>
          <SadFaceIcon class="font-color-green"></SadFaceIcon>
        </div>

        <CardReservations
          v-else
          v-for="(card, index) in thisWeek"
          :key="index"
          :guest="card.guest"
          :property="card.property"
          :startDate="card.startDate"
          :endDate="card.endDate"
        />
      </div>
    </div>

    <div>
      <p class="text-xl my-2 inter-light font-color-black font-size-20">Future weeks</p>
      <hr />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 mb-4"
      >
        <div v-if="futureWeeks.length <= 0" class="noDataDiv">
          <p>There are no current reservations</p>
          <SadFaceIcon class="font-color-green"></SadFaceIcon>
        </div>

        <CardReservations
          v-else
          v-for="(card, index) in futureWeeks"
          :key="index"
          :guest="card.guest"
          :property="card.property"
          :startDate="card.startDate"
          :endDate="card.endDate"
        />
      </div>
    </div>

    <div>
      <p class="text-xl my-2 inter-light font-color-black font-size-20">Previous weeks</p>
      <hr />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 mb-4"
      >
        <div v-if="previousWeeks.length <= 0" class="noDataDiv">
          <p>There are no current reservations</p>
          <SadFaceIcon class="font-color-green"></SadFaceIcon>
        </div>

        <CardReservations
          v-else
          v-for="(card, index) in previousWeeks"
          :key="index"
          :guest="card.guest"
          :property="card.property"
          :startDate="card.startDate"
          :endDate="card.endDate"
        />
      </div>
    </div>
  </main>
</template>

<script>
import CardReservations from "@/components/CardReservations.vue";
import SadFaceIcon from "vue-material-design-icons/EmoticonSadOutline.vue";

export default {
  components: {
    CardReservations,
    SadFaceIcon,
  },
  data() {
    return {
      cards: [
        {
          guest: "João",
          property: "Beautiful pent-house",
          startDate: "2024-04-01",
          endDate: "2024-04-05",
        },
        {
          guest: "Maria",
          property: "Beautiful pent-house",
          startDate: "2024-12-10",
          endDate: "2024-12-15",
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
  },
};
</script>

<style>
.noDataDiv {
  display: flex;
  flex-direction: row;
  column-gap: 0.5em;
}
</style>
