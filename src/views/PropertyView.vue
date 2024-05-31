<template>
  <main class="py-8 px-4">
    <div class="rating">
      <h1 class="font-size-24 inter-medium font-color-green">
        {{ property.title }}
      </h1>
      <h2
        class="font-size-18 inter-medium font-color-green"
        style="margin-left: 1rem"
      >
        {{ rating }}
      </h2>
      <Star fillColor="#133E1A" />
    </div>
    <h3 class="font-size-20 inter-light font-color-black page-title">
      {{ property.location }}
    </h3>
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
        <v-carousel-item v-for="(image, i) in propertyImages" :key="i">
          <v-sheet>
            <div class="d-flex justify-center align-center">
              <img :src="image" class="carousel-img" />
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <div id="containerBooking">
        <div id="bookingInfo">
          <h2 class="font-size-24 inter-light font-color-black">
            <span class="inter-medium">{{ property.daily_price }}€</span>/night
          </h2>
          <p class="font-size-18 inter-light font-color-black">
            {{ property.bathrooms }} bathrooms |
            {{ property.bathrooms }} bedrooms | {{ property.beds }} beds |
            {{ property.guest_number }} guests
          </p>
          <div id="book">
            <input
              class="w-8/12 border-x px-4 inter-light font-color-green"
              type="date"
              v-model="dateIn"
              id="dateIn"
            />
            <input
              class="w-8/12 border-x px-4 inter-light font-color-green"
              type="date"
              v-model="dateOut"
            />
            <div id="guests">
              <input
                class="w-5/12 border-x px-4 inter-light font-color-green"
                type="number"
                :max="this.property.guest_number"
                min="1"
                placeholder="Guests"
                v-model="nrGuests"
              />
              <Guests />
            </div>
          </div>
          <p id="total" class="font-size-18 inter-light font-color-black">
            <span class="inter-medium">Total</span> {{ total }}€
          </p>
          <button class="button-green" id="rentBtn">Rent</button>
        </div>
      </div>
    </div>
    <router-link :to="{ name: 'profile' }" id="infoOwner">
      <img
        id="photoOwner"
        src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
      />
      <div id="info">
        <h2 class="font-size-20 inter-medium font-color-green">Hosted by</h2>
        <div class="rating">
          <div class="name">
            <p class="font-size-16 inter-medium font-color-black">
              {{ owner.first_name }}
            </p>
            <p class="font-size-16 inter-medium font-color-black">
              {{ owner.last_name }}
            </p>
          </div>
          <h2
            class="font-size-16 inter-medium font-color-green"
            style="margin-left: 0.5rem"
          >
            {{ ownerRating }}
          </h2>
          <Star fillColor="#133E1A" />
        </div>
      </div>
    </router-link>
    <hr />
    <div id="propertyInfo">
      <div id="description">
        <h3 class="font-size-20 inter-medium font-color-green page-title">
          Description
        </h3>
        <p class="font-size-18 inter-light font-color-green">
          {{ descriptionProperty }}
        </p>
        <p
          @click="readMore = true"
          v-if="!readMore & (property.description.split('').length > 240)"
          class="font-size-16 inter-medium font-color-green read"
        >
          Read more +
        </p>
        <p
          @click="readMore = false"
          v-if="readMore"
          class="font-size-16 inter-medium font-color-green read"
        >
          Read less -
        </p>
      </div>
      <div id="extras">
        <h3 class="font-size-20 inter-medium font-color-green page-title">
          What this place has to offer
        </h3>
        <div id="extraContainer">
          <ArrowLeft
            v-if="property.amenities.length > 6"
            fillColor="#133E1A"
            @click="prevPage('extras')"
            :disabled="currentPageExtras == 0"
          />
          <div id="extrasGrid">
            <div v-for="(extra, index) in paginatedExtras" :key="index">
              <Television fillColor="#133E1A" />
              <p class="font-size-18 inter-light font-color-green">
                {{ extra.amenity_name }}
              </p>
            </div>
          </div>
          <ArrowRight
            v-if="property.amenities.length > 6"
            fillColor="#133E1A"
            @click="nextPage('extras')"
            :disabled="currentPageExtras == totalPagesExtras - 1"
          />
        </div>
        <p
          v-if="property.amenities.length > 6"
          class="font-size-14 inter-light font-color-green"
        >
          {{ currentPageExtras + 1 }} of {{ totalPagesExtras }}
        </p>
      </div>
    </div>
    <h3 class="font-size-20 inter-medium font-color-green page-title">
      Where you will be
    </h3>
    <!-- <iframe :src="property.map_url" height="400" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe> -->
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49666.92346360088!2d-104.93549284333204!3d38.919801040086455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8713517510b3e71d%3A0x129d2eeec706b3b0!2sNorthwest%20Colorado%20Springs%2C%20Colorado%20Springs%2C%20CO%2C%20EUA!5e0!3m2!1spt-PT!2spt!4v1716240879380!5m2!1spt-PT!2spt"
      width="600"
      height="450"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
    <h3 class="font-size-20 inter-medium font-color-green page-title">
      What the guests say
    </h3>
    <div id="reviews">
      <div id="allReviews">
        <ArrowLeft
          v-if="reviews.length > 4"
          fillColor="#133E1A"
          @click="prevPage('reviews')"
        />
        <div id="reviewsContainer">
          <div v-for="review in paginatedReviews" id="review" :key="review.id">
            <div id="mainInfo">
              <img
                id="reviewsPhoto"
                src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
              />
              <div id="infoUser">
                <h3 class="font-size-16 inter-light font-color-green">
                  {{ review.username }}
                </h3>
                <div class="rating">
                  <h2 class="font-size-16 inter-medium font-color-green">
                    {{ review.rating }}
                  </h2>
                  <Star fillColor="#133E1A" />
                </div>
              </div>
            </div>
            <p class="font-size-16 inter-light font-color-black">
              {{ review.comment }}
            </p>
          </div>
        </div>
        <ArrowRight
          v-if="reviews.length > 4"
          fillColor="#133E1A"
          @click="nextPage('reviews')"
          :disabled="currentPageReviews == totalPagesReviews - 1"
        />
      </div>
      <p
        v-if="reviews.length > 4"
        class="font-size-14 inter-light font-color-green"
        style="text-align: center"
      >
        {{ currentPageReviews + 1 }} of {{ totalPagesReviews }}
      </p>
    </div>
    <hr />
    <h3 class="font-size-20 inter-medium font-color-green page-title">
      Meet your host
    </h3>
    <div id="hostInfo">
      <router-link :to="{ name: 'profile' }" id="meetInfoOwner">
        <img
          id="meetPhotoOwner"
          src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
        />
        <div id="info">
          <div class="name">
            <h2 class="font-size-24 inter-medium font-color-green">
              {{ owner.first_name }}
            </h2>
            <h2 class="font-size-24 inter-medium font-color-green">
              {{ owner.last_name }}
            </h2>
          </div>
          <div class="rating">
            <h2 class="font-size-32 inter-medium font-color-green">
              {{ ownerRating }}
            </h2>
            <Star fillColor="#133E1A" />
          </div>
        </div>
      </router-link>
      <div id="moreOwnerInfo">
        <div v-if="owner.owner_description != null">
          <p class="font-size-18 inter-light font-color-green">
            {{ owner.owner_description }}
          </p>
          <p
            @click="readMoreMeet = true"
            v-if="
              !readMoreMeet & (owner.owner_description.split('').length > 240)
            "
            class="font-size-16 inter-medium font-color-green read"
          >
            Read more +
          </p>
          <p
            @click="readMoreMeet = false"
            v-if="readMoreMeet"
            class="font-size-16 inter-medium font-color-green read"
          >
            Read less -
          </p>
        </div>
        <div v-else style="margin-top: 2em"></div>
        <router-link :to="{ name: 'messages' }"
          ><button class="button-green">Message Lindsay</button></router-link
        >
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
import { usePropertiesStore } from "@/stores/properties";
import { useReviewsStore } from "@/stores/reviews";
import { useUsersStore } from "@/stores/users";

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
      nrGuests: 0,
      readMore: false,
      readMoreMeet: false,
      currentPageExtras: 0,
      currentPageReviews: 0,
      pageSizeExtras: 6,
      pageSizeReviews: 4,
      propertiesStore: usePropertiesStore(),
      reviewsStore: useReviewsStore(),
      usersStore: useUsersStore(),
      ownerFetched: false,
    };
  },

  computed: {
    total() {
      if (this.dateIn == "" || this.dateOut == "") {
        return 0;
      }

      const dateIn = new Date(this.dateIn);
      const dateOut = new Date(this.dateOut);
      const timeDiff = dateOut.getTime() - dateIn.getTime();
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return diffDays * this.property.daily_price;
    },

    descriptionProperty() {
      let descriptionArray = this.property.description.split("");
      if (descriptionArray.length > 240 && !this.readMore) {
        return descriptionArray.slice(0, 240).join("");
      } else {
        return descriptionArray.join("");
      }
    },

    descriptionOwner() {
      let descriptionArray = this.owner.owner_description.split("");
      console.log(descriptionArray);
      if (descriptionArray.length > 240 && !this.readMoreMeet) {
        return descriptionArray.slice(0, 240).join("");
      } else {
        return descriptionArray.join("");
      }
    },

    paginatedExtras() {
      console.log("Here");
      console.log(this.property.amenities);
      const start = this.currentPageExtras * this.pageSizeExtras;
      return this.property.amenities.slice(start, start + this.pageSizeExtras);
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
      //console.log(this.propertiesStore.getProperty.amenities);
      return this.propertiesStore.getProperty;
    },

    reviews() {
      return this.reviewsStore.getReviews;
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

    owner() {
      return this.usersStore.getUser;
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
  },

  methods: {
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
  },

  components: {
    ArrowLeft,
    ArrowRight,
    Guests,
    Star,
    Television,
  },

  async created() {
    await this.propertiesStore.fetchProperty(this.$route.params.id);
    await this.reviewsStore.fetchReviews(this.$route.params.id);
    await this.usersStore.fetchUser(this.property.owner_username);
    await this.usersStore.fetchUserReviews(this.property.owner_username);
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
  padding: 1nrem;
  background-color: #f2f2f2;
  border-radius: 11px;
  margin: 2rem 0;
  height: 10rem;
  row-gap: 1rem;
}

#dateIn {
  margin-top: 1rem;
}

#guests {
  display: flex;
  flex-direction: row;
  column-gap: 2rem;
  margin-bottom: 1rem;
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

#extras p {
  text-align: center;
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
</style>