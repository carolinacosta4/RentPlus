<template>
  <div class="flex-shrink-0 max-w-[200px] flex flex-col gap-4">
    <router-link :to="{name: 'property', params: { id: 26 } }"> <!-- mudar -->
    <img
      :src="`https://via.placeholder.com/200x200?text=${city},${country}`"
      :alt="`${city}, ${country}`"
      class="rounded-md"
    />
    <div class="flex flex-col gap-1">
      <p class="inter-semiBold font-color-black">{{ guest }}</p>
      <p class="inter-light font-size-14 font-color-green">{{ property }}</p>
      <p class="inter-light font-size-14 font-color-green">{{ startDate }} to {{ endDate }}</p>
    </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "city",
      country: "country"
    }
  },
  props: {
    guest: String,
    property : String,
    startDate: String,
    endDate: String
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
