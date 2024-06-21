<template>
  <div v-if="route != 'properties'">
    <button
      class="z-10 absolute mt-2 ml-40 bg-[#133e1a60] rounded-full text-white p-2 scale-75 hover:scale-[0.8] hover:bg-gray-800 transition">
      <BookmarkIcon fillColor="#133E1A" v-if='bookmark' @click="handleFav(true)"></BookmarkIcon>
      <BookmarkIcon v-if="!bookmark" @click="handleFav(false)"></BookmarkIcon>
    </button>

  </div>


  <div v-if="route == 'properties' && loggedUser == $route.params.id" class="iconsAlterProperty">
    <button
      class="z-10 absolute mt-2 ml-40 bg-[#133e1a60] rounded-full text-white p-2 scale-75 hover:scale-[0.8] hover:bg-gray-800 transition">
      <EditIcon @click="this.$router.push(`/edit-property/${id}`)"></EditIcon>
    </button>
    <button
      class="z-10 absolute mt-13 ml-40 bg-[red] rounded-full text-white p-2 scale-75 hover:scale-[0.8] hover:bg-gray-800 transition">

      <DeleteIcon @click="this.showModal = true"></DeleteIcon>
    </button>
  </div>

  <router-link :to="{ name: 'property', params: { id: id } }">
    <div class="w-52 h-52 rounded-lg mb-3 overflow-hidden">
      <img :src="image"
        class="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110" />
    </div>
    <h1 class="inter-semiBold font-color-green">{{ name }}</h1>
    <p class="inter-light font-size-14 font-color-green">{{ location }}</p>
    <h2 class="inter-light font-color-green">
      <span class="inter-semiBold">{{ price }}€</span> /night
    </h2>
    <p class="inter-semiBold font-size-14" v-if="blocked" id="blocked">This property is blocked. Please contact us to
      know more.</p>
  </router-link>


  <v-dialog max-width="500" v-model="showModal">
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-card-text>
            <h1 class="page-title font-size-18 inter-semiBold font-color-green">
              Are you sure you want to delete this property?
            </h1>
            <p class="inter-light font-size-14 font-color-green">
              Be aware that this action can not be undone and all your future reservations on this property will be lost.
            </p>
          </v-card-text>

          <v-card-actions id="containerBtn" class="btnsModalCongratulations">
            <button class="inter-medium button-white"
              @click="this.showModal = false">
              Cancel
            </button>
            <button class="inter-medium button-red"
              @click="deleteProperty(id)">
              Delete
            </button>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
</template>

<script>
import BookmarkIcon from "vue-material-design-icons/Bookmark.vue";
import EditIcon from "vue-material-design-icons/Pencil.vue";
import DeleteIcon from "vue-material-design-icons/Delete.vue";
import { useUsersStore } from "@/stores/users";
import { usePropertiesStore } from "@/stores/properties";

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
      propertiesStore: usePropertiesStore(),
      showModal: false,
      showModalDeleted: false
    };
  },

  computed: {
    route() {
      return this.$route.name;
    },

    loggedUser() {
      return localStorage.getItem('user')
    }
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
    async deleteProperty(idP){
      console.log(idP);
      await this.propertiesStore.delete(idP)
      this.showModal = false
      this.$emit('property-deleted', idP)
    }
  },

  components: {
    BookmarkIcon,
    EditIcon,
    DeleteIcon
  },
};
</script>

<style>
#blocked {
  color: red;
}

.iconsAlterProperty {
  display: flex;
  flex-direction: row;
  column-gap: 2em;
}

.btnsModalCongratulations{
  column-gap: 1em;
  justify-content: right;
}
</style>