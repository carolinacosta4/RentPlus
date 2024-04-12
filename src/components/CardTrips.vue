<template>
  <div class="flex-shrink-0 max-w-[200px] flex flex-col gap-4">
    <img
      :src="`https://via.placeholder.com/200x200?text=${city},${country}`"
      :alt="`${city}, ${country}`"
      class="rounded-md"
    />
    <div class="flex flex-col gap-1">
      <p class="inter-semiBold font-color-black">{{ city }}, {{ country }}</p>
      <p class="inter-light font-size-14 font-color-green">Hosted by {{ host }}</p>
      <p class="inter-light font-size-14 font-color-green">FROM {{ startDate }}</p>
      <p class="inter-light font-size-14 font-color-green">TO {{ endDate }}</p>
    </div>
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
/* Add any custom styles here */
</style>
