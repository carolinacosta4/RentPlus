<template>
  <div class="relative bg-white rounded-lg shadow-lg p-4 hover:shadow-xl">
    <button
      class="absolute top-2 right-2 bg-gray-500 text-white rounded-lg p-2 hover:bg-green-500 transition-colors duration-200"
    >
      <BookmarkIcon></BookmarkIcon>
    </button>
    <img :src="property.image" alt="Property Image" class="rounded-md mb-4" />
    <h2 class="text-lg font-semibold">{{ property.title }}</h2>
    <p class="text-gray-500">{{ property.location }}</p>
    <p class="text-gray-700">{{ property.price }}€/night</p>
  </div>
</template>

<script>
import BookmarkIcon from "vue-material-design-icons/Bookmark.vue";

export default {
  props: {
    property: {
      type: Object,
      required: true,
    },
  },
  components: {
    BookmarkIcon,
  },
};
</script>

<style>
</style>
