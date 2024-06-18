<template>
  <main class="py-8 px-4">
    <div class="rating">
      <h1 class="font-size-24 inter-medium font-color-green">{{ property.title }}</h1>
      <h2 class="font-size-18 inter-medium font-color-green" style="margin-left: 1rem">{{ rating }}</h2>
      <Star fillColor="#133E1A" />
    </div>
    <h3 class="font-size-20 inter-light font-color-black page-title">{{ property.location }}</h3>
    <div id="moreInfo">
      <v-carousel hide-delimiter-background show-arrows class="carrousel">
        <template v-slot:prev="{ props }">
          <v-btn @click="props.onClick">
            <ArrowLeft />
          </v-btn>
        </template>
        <template v-slot:next="{ props }">
          <v-btn @click="props.onClick">
            <ArrowRight />
          </v-btn>
        </template>
        <v-carousel-item v-for="(image, i) in property.photos" :key="i">
          <v-sheet>
            <div class="d-flex justify-center align-center">
              <img :src="image.photo" class="carousel-img" />
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <div id="containerBooking">
        <div id="bookingInfo">
          <h2 class="font-size-24 inter-light font-color-black">
            <span class="inter-medium">{{ property.daily_price }}€</span>/night
          </h2>
          <p class="font-size-18 inter-light font-color-black">{{ property.bathrooms }} bathrooms | {{
            property.bathrooms }}
            bedrooms | {{ property.beds }} beds | {{ property.guest_number }} guests</p>
          <div id="book">
            <div class="calendar">
              <input type="text" class="w-1/2 border-x px-4 inter-light font-color-green" v-model="formattedDateIn"
                disabled>
              <Calendar @click="openCalendarIn" />
              <div id="datepickIn" v-if="isCalendarIn">
                <VDatePicker :attributes="attributes" id="calendar" @mouseleave="openCalendarIn" v-model="dateIn" />
              </div>
            </div>
            <div class="calendar">
              <input class="w-1/2 border-x px-4 inter-light font-color-green" type="text" v-model="formattedDateOut"
                disabled>
              <Calendar @click="openCalendarOut" />
              <div id="datepickOut" v-if="isCalendarOut">
                <VDatePicker :attributes="attributes" id="calendar" @mouseleave="openCalendarOut" v-model="dateOut" />
              </div>
            </div>
            <div id="guests">
              <input class="w-5/12 border-x px-4 inter-light font-color-green" type="number"
                :max="this.property.guest_number" min="1" placeholder="Guests" v-model="nrGuests" required />
              <Guests />
            </div>
            <h3 id="errorMessage">{{ errorMessage }}</h3>
            <h3 id="sucessfullMessage">{{ sucessfullMessage }}</h3>
          </div>
          <p id="total" class="font-size-18 inter-light font-color-black">
            <span class="inter-medium">Total</span> {{ total }}€
          </p>
          <v-dialog max-width="500" v-model="isActiveDialog">
            <template v-slot:activator="{ props: activatorProps }">
              <button v-bind="activatorProps" class="button-green" id="rentBtn">Rent</button>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card>
                <v-card-text>
                  <h1 class="page-title font-size-14 modalTitle inter-light">Choose the payment method</h1>
                  <select id="paymentTypes" v-model="selectedMethod">
                    <option value="0">Select a method</option>
                    <option v-for="paymentType in paymentTypes" :value="paymentType.ID">{{ paymentType.type }}</option>
                  </select>
                </v-card-text>
                <v-card-actions>
                  <div class="btnsModal">
                    <button class="inter-medium button-green" @click="rentProperty">Rent!</button>
                    <button class="inter-medium button-border-green" @click="isActive.value = false">Cancel</button>
                  </div>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </div>
      </div>
    </div>
    <router-link :to="{ name: 'profile', params: { id: owner.username } }" id="infoOwner">
      <img id="photoOwner"
        src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg" />
      <div id="info">
        <h2 class="font-size-20 inter-medium font-color-green">Hosted by</h2>
        <div class="rating">
          <div class="name">
            <p class="font-size-16 inter-medium font-color-black"> {{ owner.first_name }} </p>
            <p class="font-size-16 inter-medium font-color-black"> {{ owner.last_name }} </p>
          </div>
          <h2 class="font-size-16 inter-medium font-color-green" style="margin-left: 0.5rem"> {{ ownerRating }} </h2>
          <Star fillColor="#133E1A" />
        </div>
      </div>
    </router-link>
    <hr />
    <div id="propertyInfo">
      <div id="description">
        <h3 class="font-size-20 inter-medium font-color-green page-title">Description</h3>
        <p class="font-size-18 inter-light font-color-green"> {{ descriptionProperty }}</p>
        <p @click="readMore = true"
          v-if="!readMore && property.description && property.description.split('').length > 240"
          class="font-size-16 inter-medium font-color-green read">Read more +</p>
        <p @click="readMore = false" v-if="readMore" class="font-size-16 inter-medium font-color-green read">Read less -
        </p>
      </div>
      <div id="extras">
        <h3 class="font-size-20 inter-medium font-color-green page-title">What this place has to offer</h3>
        <div id="extraContainer">
          <ArrowLeft v-if="property.amenities && property.amenities.length > 6" fillColor="#133E1A"
            @click="prevPage('extras')" :disabled="currentPageExtras == 0" />
          <div id="extrasGrid" v-if="property.amenities?.length > 0">
            <div v-for="(extra, index) in paginatedExtras" :key="index">
              <Television fillColor="#133E1A" />
              <p class="font-size-18 inter-light font-color-green">{{ extra.amenity_name }}</p>
            </div>
          </div>
          <div v-else>No amenities found.</div>
          <ArrowRight v-if="property.amenities && property.amenities.length > 6" fillColor="#133E1A"
            @click="nextPage('extras')" :disabled="currentPageExtras == totalPagesExtras - 1" />
        </div>
        <p v-if="property.amenities && property.amenities.length > 6" class="font-size-14 inter-light font-color-green">
          {{ currentPageExtras + 1 }} of {{ totalPagesExtras }}</p>
      </div>
    </div>
    <h3 class="font-size-20 inter-medium font-color-green page-title">Where you will be</h3>
    <iframe :src="property.map_url" height="400" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
    <h3 class="font-size-20 inter-medium font-color-green page-title">What the guests say</h3>
    <div id="reviews">
      <div id="allReviews" v-if="reviews.length > 0">
        <ArrowLeft v-if="reviews && reviews.length > 4" fillColor="#133E1A" @click="prevPage('reviews')" />
        <div id="reviewsContainer">
          <div v-for="review in paginatedReviews" id="review" :key="review.id">
            <div id="mainInfo">
              <img id="reviewsPhoto"
                src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg" />
              <div id="infoUser">
                <h3 class="font-size-16 inter-light font-color-green">{{ review.username }}</h3>
                <div class="rating">
                  <h2 class="font-size-16 inter-medium font-color-green">{{ review.rating }}</h2>
                  <Star fillColor="#133E1A" />
                </div>
              </div>
            </div>
            <p class="font-size-16 inter-light font-color-black">{{ review.comment }}</p>
          </div>
        </div>
        <ArrowRight v-if="reviews && reviews.length > 4" fillColor="#133E1A" @click="nextPage('reviews')"
          :disabled="currentPageReviews == totalPagesReviews - 1" />
      </div>
      <div v-else>No reviews found.</div>
      <p v-if="reviews && reviews.length > 4" class="font-size-14 inter-light font-color-green"
        style="text-align: center">
        {{ currentPageReviews + 1 }} of {{ totalPagesReviews }}</p>
    </div>
    <hr />
    <h3 class="font-size-20 inter-medium font-color-green page-title">Meet your host</h3>
    <div id="hostInfo">
      <router-link :to="{ name: 'profile', params: { id: owner.username } }" id="meetInfoOwner">
        <img id="meetPhotoOwner"
          src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg" />
        <div id="info">
          <div class="name">
            <h2 class="font-size-24 inter-medium font-color-green">{{ owner.first_name }}</h2>
            <h2 class="font-size-24 inter-medium font-color-green">{{ owner.last_name }}</h2>
          </div>
          <div class="rating">
            <h2 class="font-size-32 inter-medium font-color-green">{{ ownerRating }}</h2>
            <Star fillColor="#133E1A" />
          </div>
        </div>
      </router-link>
      <div id="moreOwnerInfo">
        <div v-if="owner && owner.owner_description != null">
          <p class="font-size-18 inter-light font-color-green">{{ owner.owner_description }}</p>
          <p @click="readMoreMeet = true" v-if="!readMoreMeet & (owner.owner_description.split('').length > 240)"
            class="font-size-16 inter-medium font-color-green read">Read more +</p>
          <p @click="readMoreMeet = false" v-if="readMoreMeet" class="font-size-16 inter-medium font-color-green read">
            Read
            less -</p>
        </div>
        <div v-else style="margin-top: 2em"></div>
        <router-link v-if="owner.username != loggedUser" :to="{ name: 'messages', params: { id: owner.username } }"><button class="button-green"
            id="msgBtn">Message {{ owner.username
            }}</button></router-link>
      </div>
    </div>
  </main>
</template>

<script>
import ArrowLeft from "vue-material-design-icons/ArrowLeft.vue";
import ArrowRight from "vue-material-design-icons/ArrowRight.vue";
import Guests from "vue-material-design-icons/AccountPlusOutline.vue";
import Star from "vue-material-design-icons/Star.vue";
import Television from "vue-material-design-icons/Television.vue";
import Calendar from "vue-material-design-icons/Calendar.vue";
import { usePropertiesStore } from "@/stores/properties";
import { useReviewsStore } from "@/stores/reviews";
import { useUsersStore } from "@/stores/users";
import { useReservationsStore } from "@/stores/reservations";
import { usePaymentTypesStore } from "@/stores/paymentTypes";
import { ref } from 'vue';

export default {
  data() {
    return {
      propertyImages: [
        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
        "https://media.istockphoto.com/id/1456467039/photo/beautiful-living-room-and-kitchen-in-new-luxury-home-with-white-cabinets-wood-beams-pendant.jpg?s=612x612&w=0&k=20&c=x_ZXg6o_H6Bsww7Vr8126nXnNJULmYKABuXS3sc8qqE=",
        "https://st.depositphotos.com/1321174/2454/i/450/depositphotos_24547869-stock-photo-modern-living-room.jpg",
      ],
      dateOut: "",
      dateIn: "",
      formattedDateOut: "00/00/0000",
      formattedDateIn: "00/00/0000",
      selectedMethod: 0,
      nrGuests: 1,
      readMore: false,
      readMoreMeet: false,
      currentPageExtras: 0,
      currentPageReviews: 0,
      pageSizeExtras: 6,
      pageSizeReviews: 4,
      propertiesStore: usePropertiesStore(),
      reviewsStore: useReviewsStore(),
      usersStore: useUsersStore(),
      reservationsStore: useReservationsStore(),
      paymentTypesStore: usePaymentTypesStore(),
      ownerFetched: false,
      errorMessage: "",
      sucessfullMessage: "",
      disabledDates: [],
      minDate: new Date(),
      attributes: null,
      isCalendarIn: false,
      isCalendarOut: false,
      isActiveDialog: false
    };
  },

  components: {
    ArrowLeft,
    ArrowRight,
    Guests,
    Star,
    Television,
    Calendar
  },

  async created() {
    await this.propertiesStore.fetchProperty(this.$route.params.id);
    await this.reviewsStore.fetchReviews(this.$route.params.id);
    await this.usersStore.fetchUser(this.property.owner_username);
    await this.usersStore.fetchUserReviews(this.property.owner_username);
    await this.reservationsStore.fetchReservationsPerProperty(this.$route.params.id);
    await this.paymentTypesStore.fetchPaymentTypes()
    this.computeDisabledDates()
  },

  computed: {
    descriptionProperty() {
      let descriptionArray = this.property.description?.split("");
      if (descriptionArray?.length > 240 && !this.readMore) {
        return descriptionArray.slice(0, 240).join("");
      } else {
        return descriptionArray?.join("");
      }
    },

    paginatedExtras() {
      const start = this.currentPageExtras * this.pageSizeExtras;
      return this.property.amenities.slice(start, start + this.pageSizeExtras);
    },

    total() {
      if (this.dateIn == "" || this.dateOut == "") {
        return 0;
      }

      const dateIn = this.dateIn;
      const dateOut = this.dateOut;
      const timeDiff = dateOut.getTime() - dateIn.getTime();
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return diffDays * this.property.daily_price;
    },

    descriptionOwner() {
      let descriptionArray = this.owner.owner_description.split("");
      if (descriptionArray.length > 240 && !this.readMoreMeet) {
        return descriptionArray.slice(0, 240).join("");
      } else {
        return descriptionArray.join("");
      }
    },

    paginatedReviews() {
      const start = this.currentPageReviews * this.pageSizeReviews;
      return this.reviews.slice(start, start + this.pageSizeReviews);
    },

    totalPagesExtras() {
      return Math.ceil(this.property.amenities.length / this.pageSizeExtras);
    },

    totalPagesReviews() {
      return Math.ceil(this.reviews.length / this.pageSizeReviews);
    },

    property() {
      console.log(this.propertiesStore.getProperty);
      return this.propertiesStore.getProperty;
    },

    owner() {
      return this.usersStore.getUser;
    },

    rating() {
      let total = 0;
      this.reviews.forEach((review) => {
        total += review.rating;
      });
      if (total == 0) {
        return 0;
      } else {
        const rating = total / this.reviews.length;
        return rating;
      }
    },

    reviews() {
      return this.reviewsStore.getReviews;
    },

    ownerRating() {
      let total = 0;
      this.usersStore.getOwnerReviews.forEach((review) => {
        total += review.rating;
      });

      if (total > 0) {
        return total / this.usersStore.getOwnerReviews.length;
      } else {
        return 0;
      }
    },

    paymentTypes() {
      return this.paymentTypesStore.getTypes;
    },

    loggedUser(){
      return this.usersStore.getUserLogged
    }
  },

  methods: {
    computeDisabledDates() {
      const reservations = this.reservationsStore.getReservationsProperty
      reservations.forEach(reservation => {
        const start = new Date(reservation.dateIn);
        const end = new Date(reservation.dateOut);
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          this.disabledDates.push(new Date(d));
          this.attributes = ref([
            {
              content: 'red',
              dates: this.disabledDates
            },
          ])
        }
      });
    },

    openCalendarIn() {
      return [this.isCalendarIn = !this.isCalendarIn, this.isCalendarOut = false]
    },

    openCalendarOut() {
      return [this.isCalendarOut = !this.isCalendarOut, this.isCalendarIn = false]
    },

    nextPage(n) {
      if (n == "extras") {
        if (this.currentPageExtras < this.totalPagesExtras - 1) {
          this.currentPageExtras++;
        }
      } else {
        if (this.currentPageReviews < this.totalPagesReviews - 1) {
          this.currentPageReviews++;
        }
      }
    },

    prevPage(n) {
      if (n == "extras") {
        if (this.currentPageExtras > 0) {
          this.currentPageExtras--;
        }
      } else {
        if (this.currentPageReviews > 0) {
          this.currentPageReviews--;
        }
      }
    },

    async rentProperty() {
      const dtIn = new Date(this.dateIn)
      const dtOut = new Date(this.dateOut)
      if (!this.formattedDateIn || !this.formattedDateOut || this.total <= 0) {
        this.errorMessage = 'Invalid booking details'
        this.isActiveDialog = false
      } else if (this.selectedMethod == 0) {
        this.errorMessage = 'You need to select a payment method!'
        this.isActiveDialog = false
      } else {
        try {
          await this.reservationsStore.createReservation({
            "property_ID": this.property.ID,
            "dateIn": `${dtIn.getFullYear()}-${dtIn.getMonth() + 1}-${dtIn.getDate()}`,
            "dateOut": `${dtOut.getFullYear()}-${dtOut.getMonth() + 1}-${dtOut.getDate() + 1}`,
            "total_price": this.total,
            "username": this.loggedUser,
            "payment_type": this.selectedMethod
          })

          this.sucessfullMessage = 'Reservation Successful'
          this.errorMessage = ''
        } catch (error) {
          if (error == 'Error: API request failed with status 400: {"success":false,"error":"Invalid date","msg":"You can only make reservations for future days"}') {
            this.errorMessage = ''
            this.sucessfullMessage = ''
            this.errorMessage = 'You can only make reservations for future days.';
          } else if (error == 'Error: API request failed with status 400: {"success":false,"error":"Property already booked","msg":"You cant proceed with the reservation because there is already a reservation during the chosen dates."}') {
            this.errorMessage = ''
            this.sucessfullMessage = ''
            this.errorMessage = 'There is already a reservation during the chosen dates.';
          }
        }
        this.isActiveDialog = false
      }
    },

    formatDate(date) {
      const d = new Date(date)
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${day}-${month}-${year}`
    },
  },

  watch: {
    dateIn(newValue) {
      this.formattedDateIn = this.formatDate(newValue);
    },
    dateOut(newValue) {
      this.formattedDateOut = this.formatDate(newValue);
    }
  },
};
</script>

<style lang="css" scoped>
#moreInfo {
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 4em;
  margin-bottom: 1.5em;
}

#book {
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  justify-content: center;
  background-color: #f2f2f2;
  border-radius: 11px;
  margin: 2rem 0;
  height: 50%;
}

#dateIn {
  margin-top: 2rem;
}

#guests {
  display: flex;
  flex-direction: row;
  column-gap: 2rem;
  margin-top: 1em;
}

#total {
  text-align: right;
  margin-bottom: 1rem;
}

#rentBtn {
  width: 100%;
}

.carrousel {
  max-height: 450px;
  border-radius: 11px;
}

.carousel-img {
  border-radius: 11px;
  width: 100%;
  height: auto;
  object-fit: cover;
}

#containerBooking {
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
}

#infoOwner {
  display: flex;
  flex-direction: row;
  column-gap: 2rem;
  align-items: center;
  width: 50%;
}

#meetInfoOwner {
  display: flex;
  flex-direction: row;
  column-gap: 2rem;
  align-items: center;
  width: 80%;
}

#photoOwner {
  border-radius: 100%;
  height: 60px;
  width: 60px;
}

#meetPhotoOwner {
  border-radius: 100%;
  height: 160px;
  width: 160px;
}

#info {
  display: flex;
  flex-direction: column;
}

.rating {
  display: flex;
  flex-direction: row;
  column-gap: 0.2rem;
  align-items: center;
}

hr {
  background-color: #133e1a50;
  height: 0.1rem;
  border-radius: 11px;
  margin: 2rem 0;
}

#propertyInfo {
  display: grid;
  grid-template-columns: 3fr 2fr;
  column-gap: 3rem;
  margin-bottom: 2rem;
  min-height: 15em;
}

#description h3 {
  margin-bottom: 1rem;
}

.read {
  margin: 0.5rem 0 2rem;
  text-decoration: underline #133e1a;
}

#extrasGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  row-gap: 1rem;
  width: 80%;
}

#extrasGrid div {
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
}

#extraContainer {
  display: flex;
  flex-direction: row;
  column-gap: 2rem;
  align-items: center;
  margin: 2rem 0 1rem;
}

iframe {
  width: 100%;
  border-radius: 11px;
  margin-bottom: 3rem;
}

#hostInfo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}

#reviewsPhoto {
  border-radius: 100%;
  height: 60px;
  width: 60px;
}

#allReviews {
  display: flex;
  flex-direction: row;
  height: 100%;
  column-gap: 2rem;
  align-items: center;
  margin: 1rem 0 1rem;
}

#reviewsContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  row-gap: 3rem;
  padding: 0 0.5rem;
}

#mainInfo {
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
  align-items: center;
}

#infoUser {
  display: flex;
  flex-direction: column;
}

#review {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  max-width: 500px;
}

#review p {
  width: 100%;
  word-wrap: break-word;
}

#reviews {
  min-height: 25em;
}

.name {
  display: flex;
  column-gap: 0.5em;
}

#msgBtn {
  margin-top: 1em;
}

#errorMessage,
#sucessfullMessage {
  padding: 0 16px;
  margin-bottom: 0.5em;
}

#errorMessage {
  color: red;
}

#sucessfullMessage {
  color: green;
}

.calendar {
  display: flex;
  flex-direction: row;
  margin-top: 1em;
}

#datepickIn,
#datepickOut {
  position: absolute;
  z-index: 9999;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 2rem;
}

.btnsModal {
  display: flex;
  flex-direction: row;
  padding: 0.5rem 1rem 0.13rem;
  column-gap: 1rem;
}

#inputs {
  display: flex;
  flex-direction: column;
}

#paymentTypes {
  width: 90%;
  border: #133e1a20 solid 1px;
  border-radius: 11px;
  padding: 0.5em;
  padding-left: 0.5em;
  border-radius: 5px;
}
</style>