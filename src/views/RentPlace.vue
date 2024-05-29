<template>
  <main class="h-screen flex flex-col md:flex-row">
    <!-- LEFT (visible on md and above) -->
    <div class="hidden md:flex justify-center h-full w-1/2">
      <img
        class="px-8 max-w-[400px]"
        src="@/assets/images/logo.svg"
        alt="Logo"
      />
    </div>
    <!-- RIGHT -->
    <div
      class="bg-green-900 h-full w-full md:w-1/2 flex flex-col justify-center items-center gap-5"
    >
      <img
        class="mb-24 block md:hidden"
        src="@/assets/images/logo.svg"
        alt="Logo"
      />
      <p class="text-white text-xl lg:text-2xl font-bold">
        Ready to Rent+ your place?
      </p>
      <p class="text-white text-base lg:text-lg">
        Start by putting property online!
      </p>
      <router-link :to="{name: 'create-property'}">
        <button
        class="text-green-900 font-bold px-12 py-3 mt-6 bg-white rounded-lg"
      >
        Start
      </button>
      </router-link>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style scoped>
/* Add any custom styles here */
</style>
