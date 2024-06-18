<template>
  <button
    class="z-50 absolute mt-2 ml-40 bg-[#133e1a60] rounded-full text-white p-2 scale-75 hover:scale-[0.8] hover:bg-gray-800 transition"
  >
    <BookmarkIcon
      fillColor="#133E1A"
      v-if="route != 'properties' && bookmark"
      @click="handleFav(true)"
    ></BookmarkIcon>
    <BookmarkIcon
      v-if="route != 'properties' && !bookmark"
      @click="handleFav(false)"
    ></BookmarkIcon>

    <EditIcon
      v-if="route == 'properties'"
      @click="this.$router.push(`/edit-property/${id}`)"
    ></EditIcon>
  </button>
  <router-link :to="{ name: 'property', params: { id: id } }">
    <div class="w-52 h-52 rounded-lg mb-3 overflow-hidden">
      <img
        :src="image"
        class="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
      />
    </div>
    <h1 class="inter-semiBold font-color-green">{{ name }}</h1>
    <p class="inter-light font-size-14 font-color-green">{{ location }}</p>
    <h2 class="inter-light font-color-green">
      <span class="inter-semiBold">{{ price }}€</span> /night
    </h2>
    <p class="inter-semiBold font-size-14" v-if="blocked" id="blocked">This property is blocked. Please contact us to know more.</p>
  </router-link>
</template>

<script>
import BookmarkIcon from "vue-material-design-icons/Bookmark.vue";
import EditIcon from "vue-material-design-icons/Pencil.vue";
import { useUsersStore } from "@/stores/users";

export default {
  props: {
    image: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: false,
    },

    price: {
      type: Number,
      required: true,
    },

    id: {
      type: Number,
      required: true,
    },

    bookmark: {
      type: Boolean
    },

    blocked: {
      type: Boolean
    }
  },

  data() {
    return {
      usersStore: useUsersStore(),
    };
  },

  computed: {
    route() {
      return this.$route.name;
    },
  },

  methods: {
    async handleFav(bool) {
      try {
        await this.usersStore.toggleFavorite(bool, this.id);
        location.reload()
      } catch (error) {
        console.error("Failed to toggle favorite status:", error);
      }
    },
  },

  components: {
    BookmarkIcon,
    EditIcon,
  },
};
</script>

<style>
#blocked{
  color: red;
}
</style>