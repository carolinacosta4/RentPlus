<template>
  <div class="flex-shrink-0 max-w-[200px] flex flex-col gap-4">
    <img
      :src="`https://via.placeholder.com/200x200?text=${city},${country}`"
      :alt="`${city}, ${country}`"
      class="rounded-md"
    />
    <div class="flex flex-col gap-1">
      <p class="font-semibold">{{ city }}, {{ country }}</p>
      <p>Hosted by {{ host }}</p>
      <p>FROM {{ startDate }}</p>
      <p>TO {{ endDate }}</p>
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
