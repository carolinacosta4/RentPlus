<template>
  <div class="flex-shrink-0 max-w-[200px] flex flex-col gap-4">
    <router-link :to="{ name: 'property', params: { id: id } }">
      <img
        :src="image"
        class="rounded-md" id="img"
      />
      <div class="flex flex-col gap-1">
        <p class="inter-semiBold font-color-green">{{ city }}, {{ country }}</p>
        <p class="inter-light font-size-14 font-color-green">
          Hosted by {{ host }}
        </p>
        <p class="inter-light font-size-14 font-color-green">
          {{ startDate }} to {{ endDate }}
        </p>
      </div>
    </router-link>
    <button class="button-green" v-if="!isReviewed & review" @click="leaveReview">
      Leave a review
    </button>
  </div>
</template>

<script>
export default {
  props: {
    city: String,
    country: String,
    host: String,
    startDate: String,
    endDate: String,
    id: Number,
    isReviewed: Boolean,
    image: String,
    review: Boolean
  },

  methods: {
    leaveReview() {
      this.$emit("leave-review");
    },
  },
};
</script>

<style scoped>
#img {
  width: 180px;
  height: 180px;
  object-fit: cover;
}
</style>