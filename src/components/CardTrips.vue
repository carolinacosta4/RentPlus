<template>
  <div class="flex-shrink-0 max-w-[200px] flex flex-col gap-4">
    <router-link :to="{name: 'property', params: { id: 26 } }"> <!-- mudar -->
    <img
      :src="`https://via.placeholder.com/200x200?text=${city},${country}`"
      :alt="`${city}, ${country}`"
      class="rounded-md"
    />
    <div class="flex flex-col gap-1">
      <p class="inter-semiBold font-color-green">{{ city }}, {{ country }}</p>
      <p class="inter-light font-size-14 font-color-green">Hosted by {{ host }}</p>
      <p class="inter-light font-size-14 font-color-green">{{ startDate }} to {{ endDate }}</p>
    </div>
    <button class="button-green ">
      Leave a review
    </button>
  </router-link>
  </div>
</template>

<script>
export default {
  props: {
    city: String,
    country: String,
    host: String,
    startDate: String,
    endDate: String
  }
};
</script>

<style scoped>
</style>
