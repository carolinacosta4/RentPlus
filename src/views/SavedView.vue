<template>
  <main>
    <h1 class="inter-medium font-color-green font-size-24 page-title">Saved</h1>
    <nav id="saved" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <div v-for="property in properties" :key="property.name">
        <PropertyContainer :image='property.image' :name='property.name' :location='property.location' :price='property.price'/>
      </div>
    </nav>
  </main>
</template>

<script>
import PropertyContainer from '../components/PropertyContainer.vue';
  export default {
    data() {
      return {
        properties: [
          {image:"https://img.freepik.com/free-photo/modern-house-architectural-design-photography_1409-6516.jpg",
            name:"Beautiful pent-house", 
            location:"Porto, PT",
            price:"25€"},
          {image:"https://static.dezeen.com/uploads/2011/02/dzn_House-in-Ise-by-Takashi-Yamaguchi-and-Associates-1.jpg",
            name:"Beautiful pent-house", 
            location:"Lisbon, PT",
            price:"45€"},
          {image:"https://media.houseandgarden.co.uk/photos/61894e9d8373470f8394e674/1:1/w_1280,h_1280,c_limit/CNSTMMGLPICT000002518641-house-11jan17-simon-upton_b.jpg",
            name:"Beautiful pent-house", 
            location:"Porto, PT",
            price:"25€"},
          {image:"https://clv.h-cdn.co/assets/17/09/1280x1280/square-1488319017-pastel-pretties-purple-house-0417.jpg",
            name:"Beautiful pent-house", 
            location:"Lisbon, PT",
            price:"45€"},
          {image:"https://media.cntraveller.com/photos/611bf687f6bd8f17556dba51/1:1/w_1280,h_1280,c_limit/gatsby-somerset-conde-nast-traveller-28nov17-pr.jpg",
            name:"Beautiful pent-house", 
            location:"Porto, PT",
            price:"25€"},
          {image:"https://design-milk.com/images/2023/04/La-Mini-Tiny-House-Turkey-StudioFEM-0.jpg",
            name:"Beautiful pent-house", 
            location:"Lisbon, PT",
            price:"45€"},
        ]
      }
    },

    components: {
      PropertyContainer,
    }
  }
</script>

<style scoped>
</style>

