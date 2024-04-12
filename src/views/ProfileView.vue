<template>
  <main>
    <div id="pictureProfile">
      <img class="w-40 h-40 rounded-full"
        src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
        alt="user photo" />
    </div>
    <div id="usernameProfile">
      <h1 class="inter-medium font-size-32 font-color-green">carolina04</h1>
    </div>
    <div id="photoBtn">
      <button id="editPhoto" class="font-color-green inter-bold">Change photo</button>
    </div>
    <div id="infoProfile">
      <h3 class="inter-medium font-size-20 firstName font-color-green">First name</h3>
      <p class="inter-light font-size-20">Carolina</p>
      <h3 class="inter-medium font-size-20 font-color-green">Last name</h3>
      <p class="inter-light font-size-20">Costa</p>
      <h3 class="inter-medium font-size-20 font-color-green">Phone number</h3>
      <p class="inter-light font-size-20">+3519930993</p>
      <h3 class="inter-medium font-size-20 font-color-green">Email</h3>
      <p class="inter-light font-size-20">carolinacosta@gmail.com</p>
    </div>
  </main>
</template>

<script setup>
</script>

<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr 8fr;
  grid-template-rows: 1fr 4fr;
  row-gap: 1em;
  column-gap: 1em;
}

#pictureProfile, #usernameProfile {
  display: flex;
  align-items: center;
}

#editPhoto {
  background-color: #F5F5F5;
  border-radius: 8px;
  width: 9em;
  height: 2.5em;
}

#photoBtn, #pictureProfile{
  display: flex;
  justify-content: center;
}

h3:not(.firstName){
  margin-top: 1.5em;
}
</style>
