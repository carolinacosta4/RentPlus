<template>
  <main>
    <!-- Input area -->
    <p class="mb-4">Find the perfect spot for your holidays</p>
    <div class="flex mb-6 border px-6 py-2 rounded-lg">
      <!-- Location input -->
      <input
        class="w-4/12 focus:outline-none"
        type="text"
        placeholder="Location"
      />

      <!-- Date input -->
      <input
        class="w-3/12 border-x px-4"
        type="date"
        :value="new Date().toISOString().slice(0, 10)"
      />

      <!-- Guests input -->
      <input
        class="w-3/12 focus:outline-none pl-4"
        type="number"
        placeholder="Guests"
        max="100"
      />
    </div>

    <p class="mb-4">Find specifics</p>
    <input
      class="focus:outline-none border px-6 py-2 rounded-lg mb-16"
      type="text"
      placeholder="Search"
    />

    <!-- CARDS -->
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
    >
      <div
        v-for="property in properties"
        :key="property.id"
        class="relative bg-white rounded-lg shadow-lg p-4 hover:shadow-xl"
      >
        <button
          class="absolute top-2 right-2 bg-gray-500 text-white rounded-lg p-2 hover:bg-green-500 transition-colors duration-200"
        >
          Save
        </button>
        <img
          :src="property.image"
          alt="Property Image"
          class="rounded-md mb-4"
        />
        <h2 class="text-lg font-semibold">{{ property.title }}</h2>
        <p class="text-gray-500">{{ property.location }}</p>
        <p class="text-gray-700">{{ property.price }}€/night</p>
      </div>
    </div>
  </main>
</template>

<script setup>
const properties = [
  {
    id: 1,
    image: "https://via.placeholder.com/400x400",
    title: "Beautiful Penthouse",
    location: "Porto, PT",
    price: 25,
  },
  {
    id: 2,
    image: "https://via.placeholder.com/400x400",
    title: "Cozy Apartment",
    location: "Lisbon, PT",
    price: 30,
  },
  {
    id: 3,
    image: "https://via.placeholder.com/400x400",
    title: "Seaside Villa",
    location: "Algarve, PT",
    price: 50,
  },
  {
    id: 4,
    image: "https://via.placeholder.com/400x400",
    title: "Beautiful Penthouse",
    location: "Porto, PT",
    price: 25,
  },
  {
    id: 5,
    image: "https://via.placeholder.com/400x400",
    title: "Cozy Apartment",
    location: "Lisbon, PT",
    price: 30,
  },
  {
    id: 6,
    image: "https://via.placeholder.com/400x400",
    title: "Seaside Villa",
    location: "Algarve, PT",
    price: 50,
  },
  {
    id: 7,
    image: "https://via.placeholder.com/400x400",
    title: "Beautiful Penthouse",
    location: "Porto, PT",
    price: 25,
  },
  {
    id: 8,
    image: "https://via.placeholder.com/400x400",
    title: "Cozy Apartment",
    location: "Lisbon, PT",
    price: 30,
  },
  {
    id: 9,
    image: "https://via.placeholder.com/400x400",
    title: "Seaside Villa",
    location: "Algarve, PT",
    price: 50,
  },
];
</script>
