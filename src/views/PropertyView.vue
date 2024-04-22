<template>
    <div>
        <h1>{{ property.name }}</h1>
        <h2>{{ property.rating }}</h2>
        <h3>{{ property.location }}</h3>
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
                    <v-sheet height="100%">
                        <div class="d-flex fill-height justify-center align-center">
                            <img :src="image" alt="">
                        </div>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
            <!-- <img :src="property.image" alt=""> -->
            <div id="bookingInfo">
                <h2>{{ property.price }}€ /night</h2>
                <p>2 bedrooms | 4 beds | 8 guests</p>
                <div id="book">
                    <input type="date" name="" id="" v-model="dateIn">
                    <input type="date" name="" id="" v-model="dateOut">
                    <input type="number" name="" id="">
                </div>
                <p>Total {{ total }}€</p>
                <button class="button-green">Rent</button>
            </div>
        </div>
        <h2>Hosted by</h2>
        <p>Lindsay Lorran</p>
        <p>4</p>
        <hr>
        <div id="propertyInfo">
            <div id="description">
                <h3>Description</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus arcu ligula, fermentum at lorem
                    id, euismod ullamcorper felis. Proin aliquet bibendum dolor eu semper. Nunc consequat venenatis
                    elementum. Nulla nunc felis, euismod sit amet ornare sed, consequat quis eros. Cras at dignissim
                    velit. Phasellus vitae lorem dignissim, maximus elit vitae, ornare tortor. Nunc aliquam ultricies
                    eros nec ultricies. Maecenas ultrices lacinia sollicitudin. Praesent luctus sapien nisi, sed
                    malesuada eros porttitor sed. Fusce vestibulum arcu non nisl egestas lobortis. Duis euismod maximus
                    justo, eu iaculis ex egestas nec. Praesent venenatis sem dui, et porta mi mattis nec.</p>
            </div>
            <div id="extras">
                <h3>What this place has to offer</h3>
            </div>
        </div>
        <h3>Where you will be</h3>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.3614374759904!2d-8.741617385292779!3d41.36623140527072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd244419ac8a36b3%3A0x9219b42064878c38!2sEscola%20Superior%20de%20Media%20Artes%20e%20Design%20-%20Polit%C3%A9cnico%20do%20Porto!5e0!3m2!1spt-PT!2spt!4v1671057312921!5m2!1spt-PT!2spt"
            width="500" height="270" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        <h3>What the guests say</h3>
        <hr>
        <h3>Meet your host</h3>
        <div id="hostInfo">
            <div id="firstInfo">

            </div>
            <div id="moreInfo">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus arcu ligula, fermentum at lorem
                    id, euismod ullamcorper felis. Proin aliquet bibendum dolor eu semper. Nunc consequat venenatis
                    elementum. Nulla nunc felis, euismod sit amet ornare sed, consequat quis eros. Cras at dignissim
                    velit. Phasellus vitae lorem dignissim, maximus elit vitae, ornare tortor. Nunc aliquam ultricies
                    eros nec ultricies. Maecenas ultrices lacinia sollicitudin. Praesent luctus sapien nisi, sed
                    malesuada eros porttitor sed. Fusce vestibulum arcu non nisl egestas lobortis. Duis euismod maximus
                    justo, eu iaculis ex egestas nec. Praesent venenatis sem dui, et porta mi mattis nec.</p>
                <router-link :to="{ name: messages }"><button class="button-green">Message the
                        owner</button></router-link>
            </div>
        </div>
    </div>
</template>

<script>
import ArrowLeft from "vue-material-design-icons/ArrowLeft.vue";
import ArrowRight from "vue-material-design-icons/ArrowRight.vue";

export default {
    data() {
        return {
            property: {
                image: "https://via.placeholder.com/700x500",
                name: "Beautiful pent-house",
                location: "Porto, PT",
                price: 25,
                rating: 4
            },
            images: ["https://via.placeholder.com/900x500", "https://via.placeholder.com/900x500"],
            dateOut: "",
            dateIn: "",
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
        }
    },

    components: {
        ArrowLeft,
        ArrowRight,
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
    padding: 1em;
    background-color: #F2F2F2;
    border-radius: 11px;
}
</style>