<template>
  <div class="flex-shrink-0 max-w-[200px] flex flex-col gap-4">
    <router-link :to="{name: 'property', params: { id: id } }">
    <img id="img"
      :src="image"
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
  props: {
    guest: String,
    property : String,
    startDate: String,
    endDate: String,
    id: Number,
    image: String
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