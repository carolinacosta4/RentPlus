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
      <div v-if="currentTrips.length != 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 mb-4"
      >
        <CardTrips
          v-for="trip in currentTrips"
          :key="trip.ID"
          :image="trip.image"
          :id="trip.property_ID"
          :city="trip.city"
          :country="trip.country"
          :host="trip.host"
          :startDate="formatDate(trip.dateIn)"
          :endDate="formatDate(trip.dateOut)"
        />
      </div>
      <div v-else class="noDataDiv gap-4 mt-6 mb-4">
        <p>There are no current trips</p>
        <SadFaceIcon class="font-color-green"></SadFaceIcon>
      </div>
    </div>

    <!-- FUTURE -->

    <div>
      <p class="text-xl my-2 inter-light font-color-black font-size-20">
        Future
      </p>
      <hr />
      <!-- Cards -->
      <div v-if="futureTrips.length != 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 mb-4"
      >
        <CardTrips
          v-for="trip in futureTrips"
          :key="trip.ID"
          :image="trip.image"
          :id="trip.property_ID"
          :city="trip.city"
          :country="trip.country"
          :host="trip.host"
          :startDate="formatDate(trip.dateIn)"
          :endDate="formatDate(trip.dateOut)"
        />
      </div>
      <div v-else class="noDataDiv gap-4 mt-6 mb-4">
        <p>There are no future trips</p>
        <SadFaceIcon class="font-color-green"></SadFaceIcon>
      </div>
    </div>

    <!-- PREVIOUS -->

    <div>
      <p class="text-xl my-2 inter-light font-color-black font-size-20">
        Previous
      </p>
      <hr />
      <!-- Cards -->
      <div v-if="previousTrips.length != 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 mb-4"
      >
        <CardTrips
          v-for="trip in previousTrips"
          :key="trip.ID"
          :image="trip.image"
          :id="trip.property_ID"
          :city="trip.city"
          :country="trip.country"
          :host="trip.host"
          :startDate="formatDate(trip.dateIn)"
          :endDate="formatDate(trip.dateOut)"
          :isButton="true"
          :isReviewed="trip.isReviewed"
          @leave-review="showModal({reservation: trip.ID, property: trip.property_ID})"
        />
      </div>
      <div v-else class="noDataDiv gap-4 mt-6 mb-4">
        <p>There are no previous trips</p>
        <SadFaceIcon class="font-color-green"></SadFaceIcon>
      </div>
    </div>

    <!--  -->
    <!-- MODAL -->
    <!--  -->
    <v-dialog v-model="isModalVisible" max-width="500px">
      <v-card>
        <v-card-text>
          <h1 class="page-title font-size-14 modalTitle inter-bold">
            Leave a Review
          </h1>

          <!-- Star Rating -->
          <div>
            <h1 class="pb-1 font-size-14 inter-medium">Rate this property</h1>
            <div class="flex items-center space-x-1">
              <Star
                v-for="n in 5"
                :key="n"
                class="cursor-pointer"
                :class="{
                  'text-gray-400': n > selectedRating,
                  'text-yellow-500': n <= selectedRating,
                }"
                @click="selectedRating = n"
              />
            </div>
          </div>

          <!-- Comment -->
          <h1 class="py-2 font-size-14 inter-medium">Write a Comment</h1>
          <textarea
            v-model="reviewText"
            placeholder="Write your review here..."
            class="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </v-card-text>
        <v-card-actions>
          <div class="flex gap-2 justify-end w-full">
            <button
              class="inter-medium button-border-green"
              @click="
                isModalVisible = false;
                selectedRating = 0;
                reviewText = '';
              "
            >
              Close
            </button>
            <button class="inter-medium button-green" @click="submitReview">
              Submit Review
            </button>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
import CardTrips from "@/components/CardTrips.vue";
import { useReservationsStore } from "@/stores/reservations";
import { usePropertiesStore } from "@/stores/properties";
import { useReviewsStore } from "@/stores/reviews";
import Star from "vue-material-design-icons/Star.vue";
import SadFaceIcon from "vue-material-design-icons/EmoticonSadOutline.vue";

export default {
  components: {
    CardTrips,
    Star,
    SadFaceIcon
  },
  data() {
    return {
      reservationsStore: useReservationsStore(),
      propertiesStore: usePropertiesStore(),
      reviewsStore: useReviewsStore(),
      allTrips: [],
      currentTrips: [],
      futureTrips: [],
      previousTrips: [],
      isModalVisible: false,
      reviewText: "",
      selectedRating: 0,
      reservationID: 0,
      propertyID: 0
    };
  },

  async created() {
    await this.reservationsStore.getUserTrips(this.loggedUser);
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
        await this.reviewsStore.fetchReviews(trip.property_ID);
        trip.city = propertyDetails.location.split(",")[0].trim();
        trip.country = propertyDetails.location.split(",")[1].trim();
        trip.host = propertyDetails.owner_username;
        trip.ID = trip.ID
        trip.image = propertyDetails.photos[0].photo
        // trip.isReviewed = this.reviewsStore.getReviews.find(review => review.reservation_ID === trip.ID);
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

    showModal(data) {
      this.reservationID = data.reservation
      this.propertyID = data.property
      this.isModalVisible = true;
    },

    async submitReview() {
      // RATING
      if (this.selectedRating === 0) {
        alert("Please rate the property before submitting your review.");
        return;
      }
      const comment = this.reviewText || "";

      try {
        await this.reviewsStore.postReview(this.propertyID, {
          reservationID: this.reservationID,
          comment: comment,
          rating: this.selectedRating,
        });

        // RESET STATE
        this.isModalVisible = false;
        this.reservationID = 0
        this.propertyID = 0
        this.reviewText = "";
        this.selectedRating = 0;
      } catch (error) {
        console.error("Error submitting review:", error);
        alert(
          "An error occurred while submitting your review. Please try again."
        );
      }
    },
  },

  computed: {
    loggedUser() {
      return localStorage.getItem("user")
    }
  },
};
</script>

<style scoped>
.noDataDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 0.5em;
}
</style>