<template>
    <router-link :to="{name: 'property'}">
        <button class="absolute background text-white p-2">
            <BookmarkIcon v-if="route != 'properties'"></BookmarkIcon>
            <EditIcon v-else></EditIcon>
        </button>
        <img :src="image" class="thumbnailHouse mb-3">
        <h1 class="inter-semiBold font-color-green">{{ name }}</h1>
        <p class="inter-light font-size-14 font-color-green">{{ location }}</p>
        <h2 class="inter-light font-color-green"><span class="inter-semiBold">{{ price }}€</span> /night</h2>
    </router-link>
</template>

<script>
import BookmarkIcon from "vue-material-design-icons/Bookmark.vue";
import EditIcon from "vue-material-design-icons/Pencil.vue";

export default {
    props: {
        image: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: false
        },

        price: {
            type: Number,
            required: true
        }
    },

    computed: {
        route() {
            return this.$route.name;
        }
    },

    components: {
        BookmarkIcon,
        EditIcon
    },
}
</script>

<style lang="css" scoped>
.thumbnailHouse {
    width: 200px;
    height: 200px;
    border-radius: 11px;
}

.background {
    background-color: #133E1A60;
    border-radius: 100%;
    margin-left: 9.6rem;
    margin-top: 0.4rem;
}
</style>