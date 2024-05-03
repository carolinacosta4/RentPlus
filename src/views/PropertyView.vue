<template>
    <main class="py-8 px-4">
        <div class="rating">
            <h1 class="font-size-24 inter-medium font-color-green">{{ property.name }}</h1>
            <h2 class="font-size-18 inter-medium font-color-green" style="margin-left: 1rem;">{{ property.rating }}</h2>
            <Star fillColor="#133E1A" />
        </div>
        <h3 class="font-size-20 inter-light font-color-black page-title">{{ property.location }}</h3>
        <div id="moreInfo">
            <v-carousel hide-delimiter-background show-arrows>
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
                <v-carousel-item v-for="(image, i) in images" :key="i">
                    <v-sheet>
                        <div class="d-flex justify-center align-center">
                            <img :src="image" class="carousel-img">
                        </div>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
            <div id="containerBooking">
                <div id="bookingInfo">
                    <h2 class="font-size-24 inter-light font-color-black"><span class="inter-medium">{{ property.price
                            }}€
                        </span>/night
                    </h2>
                    <p class="font-size-18 inter-light font-color-black">2 bedrooms | 4 beds | 8 guests</p>
                    <div id="book">
                        <input class="w-8/12 border-x px-4 inter-light font-color-green" type="date" v-model="dateIn" />
                        <input class="w-8/12 border-x px-4 inter-light font-color-green" type="date"
                            v-model="dateOut" />
                        <div id="guests">
                            <input class="w-5/12 border-x px-4 inter-light font-color-green" type="number"
                                placeholder="Guests" v-model="nrGuests">
                            <Guests />
                        </div>
                    </div>
                    <p id="total" class="font-size-18 inter-light font-color-black"><span
                            class="inter-medium">Total</span>
                        {{ total }}€
                    </p>
                    <button class="button-green" id="rentBtn">Rent</button>
                </div>
            </div>
        </div>
        <router-link :to="{ name: 'profile' }" id="infoOwner">
            <img id="photoOwner"
                src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg">
            <div id="info">
                <h2 class="font-size-20 inter-medium font-color-green">Hosted by</h2>
                <div class="rating">
                    <p class="font-size-16 inter-medium font-color-black">Lindsay Lorran</p>
                    <h2 class="font-size-16 inter-medium font-color-green" style="margin-left: 0.5rem;">4</h2>
                    <Star fillColor="#133E1A" />
                </div>
            </div>
        </router-link>
        <hr>
        <div id="propertyInfo">
            <div id="description">
                <h3 class="font-size-20 inter-medium font-color-green page-title">Description</h3>
                <p class="font-size-18 inter-light font-color-green">{{ descriptionProperty }}</p>
                <p @click="readMore = true" v-if="!readMore" class="font-size-16 inter-medium font-color-green read">
                    Read more +
                </p>
                <p @click="readMore = false" v-if="readMore" class="font-size-16 inter-medium font-color-green read">
                    Read less -
                </p>
            </div>
            <div id="extras">
                <h3 class="font-size-20 inter-medium font-color-green page-title">What this place has to offer</h3>
                <div id="extraContainer">
                    <ArrowLeft fillColor="#133E1A" @click="prevPage('extras')" :disabled="currentPageExtras == 0" />
                    <div id="extrasGrid">
                        <div v-for="(extra, index) in paginatedExtras" :key="index">
                            <Television fillColor="#133E1A" />
                            <p class="font-size-18 inter-light font-color-green">{{ extra.name }}</p>
                        </div>
                    </div>
                    <ArrowRight fillColor="#133E1A" @click="nextPage('extras')"
                        :disabled="currentPageExtras == totalPagesExtras - 1" />
                </div>
                <p class="font-size-14 inter-light font-color-green">{{ currentPageExtras + 1 }} of {{ totalPagesExtras
                    }}</p>
            </div>
        </div>
        <h3 class="font-size-20 inter-medium font-color-green page-title">Where you will be</h3>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.3614374759904!2d-8.741617385292779!3d41.36623140527072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd244419ac8a36b3%3A0x9219b42064878c38!2sEscola%20Superior%20de%20Media%20Artes%20e%20Design%20-%20Polit%C3%A9cnico%20do%20Porto!5e0!3m2!1spt-PT!2spt!4v1671057312921!5m2!1spt-PT!2spt"
            height="400" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        <h3 class="font-size-20 inter-medium font-color-green page-title">What the guests say</h3>
        <div id="reviews">
            <div id="allReviews">
                <ArrowLeft fillColor="#133E1A" @click="prevPage('reviews')" />
                <div id="reviewsContainer">
                    <div v-for="review in paginatedReviews" id="review" :key="review.id">
                        <div id="mainInfo">
                            <img id="reviewsPhoto"
                                src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg">
                            <div id="infoUser">
                                <h3 class="font-size-16 inter-light font-color-green">{{ review.username }}</h3>
                                <div class="rating">
                                    <h2 class="font-size-16 inter-medium font-color-green">4</h2>
                                    <Star fillColor="#133E1A" />
                                </div>
                            </div>
                        </div>
                        <p class="font-size-16 inter-light font-color-black">{{ review.comments }}</p>
                    </div>
                </div>
                <ArrowRight fillColor="#133E1A" @click="nextPage('reviews')"
                    :disabled="currentPageReviews == totalPagesReviews - 1" />
            </div>
            <p class="font-size-14 inter-light font-color-green" style="text-align: center">{{ currentPageReviews + 1 }}
                of {{
                totalPagesReviews }}
            </p>
        </div>
        <hr>
        <h3 class="font-size-20 inter-medium font-color-green page-title">Meet your host</h3>
        <div id="hostInfo">
            <router-link :to="{ name: 'profile' }" id="meetInfoOwner">
                <img id="meetPhotoOwner"
                    src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg">
                <div id="info">
                    <h2 class="font-size-32 inter-medium font-color-green">Lindsay Lorran</h2>
                    <div class="rating">
                        <h2 class="font-size-32 inter-medium font-color-green">4</h2>
                        <Star fillColor="#133E1A" />
                    </div>
                </div>
            </router-link>
            <div id="moreOwnerInfo">
                <p class="font-size-18 inter-light font-color-green">{{ descriptionOwner }}</p>
                <p @click="readMoreMeet = true" v-if="!readMoreMeet"
                    class="font-size-16 inter-medium font-color-green read">
                    Read more +
                </p>
                <p @click="readMoreMeet = false" v-if="readMoreMeet"
                    class="font-size-16 inter-medium font-color-green read">
                    Read less -
                </p>
                <router-link :to="{ name: 'messages' }"><button class="button-green">Message
                        Lindsay</button></router-link>
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

export default {
    data() {
        return {
            property: {
                image: "https://via.placeholder.com/700x500",
                name: "Beautiful pent-house",
                location: "Porto, PT",
                price: 25,
                rating: 4,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus arcu ligula, fermentum at lorem id, euismod ullamcorper felis.Proin aliquet bibendum dolor eu semper.Nunc consequat venenatis elementum.Nulla nunc felis, euismod sit amet ornare sed, consequat quis eros.Cras at dignissim velit.Phasellus vitae lorem dignissim, maximus elit vitae, ornare tortor.Nunc aliquam ultricies eros nec ultricies.Maecenas ultrices lacinia sollicitudin.Praesent luctus sapien nisi, sed malesuada eros porttitor sed.Fusce vestibulum arcu non nisl egestas lobortis.Duis euismod maximus justo, eu iaculis ex egestas nec.Praesent venenatis sem dui, et porta mi mattis nec."
            },
            images: ["https://via.placeholder.com/900x500", "https://via.placeholder.com/900x500"],
            dateOut: "",
            dateIn: "",
            nrGuests: 0,
            readMore: false,
            readMoreMeet: false,
            extras: [
                { name: "TV", icon: "Television" },
                { name: "TV", icon: "Television" },
                { name: "TV", icon: "Television" },
                { name: "Smoking allowed", icon: "Television" },
                { name: "TV", icon: "Television" },
                { name: "TV", icon: "Television" },
                { name: "TV", icon: "Television" },
                { name: "TV", icon: "Television" },
                { name: "TV", icon: "Television" },
                { name: "TV", icon: "Television" },
                { name: "TV", icon: "Television" },
                { name: "TV", icon: "Television" },
                { name: "TV", icon: "Television" },
                { name: "TV", icon: "Television" },
            ],
            reviews: [
                { id: 1, username: "carolina4", rating: 4, comments: "Loved this place, it was very peaceful and close to turist places!! :)" },
                { id: 2, username: "carolina4", rating: 4, comments: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
                { id: 3, username: "carolina4", rating: 4, comments: "Loved this place!" },
                { id: 4, username: "carolina4", rating: 4, comments: "Loved this place!" },
                { id: 5, username: "carolina4", rating: 4, comments: "Loved this place!" },
                { id: 6, username: "carolina4", rating: 4, comments: "Loved this place!" },
            ],
            currentPageExtras: 0,
            currentPageReviews: 0,
            pageSizeExtras: 6,
            pageSizeReviews: 4,
        }
    },

    computed: {
        total() {
            if (this.dateIn == "" || this.dateOut == "") {
                return 0
            }

            const dateIn = new Date(this.dateIn);
            const dateOut = new Date(this.dateOut);
            const timeDiff = dateOut.getTime() - dateIn.getTime();
            const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return diffDays * this.property.price;
        },

        descriptionProperty() {
            let descriptionArray = this.property.description.split('')
            if (descriptionArray.length > 240 && !this.readMore) {
                return descriptionArray.slice(0, 240).join('')
            } else {
                return descriptionArray.join('')
            }
        },

        descriptionOwner() {
            let descriptionArray = this.property.description.split('')
            if (descriptionArray.length > 240 && !this.readMoreMeet) {
                return descriptionArray.slice(0, 240).join('')
            } else {
                return descriptionArray.join('')
            }
        },

        paginatedExtras() {
            const start = this.currentPageExtras * this.pageSizeExtras;
            return this.extras.slice(start, start + this.pageSizeExtras);
        },

        paginatedReviews() {
            const start = this.currentPageReviews * this.pageSizeReviews;
            return this.reviews.slice(start, start + this.pageSizeReviews);
        },

        totalPagesExtras() {
            return Math.ceil(this.extras.length / this.pageSizeExtras);
        },

        totalPagesReviews() {
            return Math.ceil(this.reviews.length / this.pageSizeReviews);
        },
    },

    methods: {
        openCalendar() {
            return this.opened = !this.opened
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
    },

    components: {
        ArrowLeft,
        ArrowRight,
        Guests,
        Star,
        Television,
    },
}
</script>

<style lang="css" scoped>
#moreInfo {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 4em;
}

#book {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    background-color: #F2F2F2;
    border-radius: 11px;
    margin: 2rem 0;
    height: 10rem;
}

#guests {
    display: flex;
    flex-direction: row;
    column-gap: 1.5rem;
}

#total {
    text-align: right;
    margin-bottom: 1rem;
}

#rentBtn {
    width: 100%;
}

.carousel-img {
    border-radius: 11px;
}

#containerBooking {
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
}

#bookingInfo {
    /* height: 500px; */
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
    background-color: #133E1A50;
    height: 0.1rem;
    border-radius: 11px;
    margin: 2rem 0;
}

#propertyInfo {
    display: grid;
    grid-template-columns: 3fr 2fr;
    column-gap: 3rem;
    margin-bottom: 2rem;
}

#description h3 {
    margin-bottom: 1rem;
}

.read {
    margin: 0.5rem 0 2rem;
    text-decoration: underline #133E1A;
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
</style>