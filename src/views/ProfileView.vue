<template>
  <main class="py-8 px-4">
    <div id="normalProfile">
      <div id="pictureProfile">
        <img class="w-40 h-40 rounded-full"
          src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
          alt="user photo" />
      </div>
      <div id="usernameProfile">
        <h1 class="inter-medium font-size-32 font-color-green">carolina04</h1>
      </div>
      <div id="photoBtn">
        <button class="font-color-green inter-bold button-white">Change photo</button>
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
    </div>
    <!-- <div id="ownerProfile">
      <div id="container">
        <h2 class="inter-medium font-size-24 font-color-green">Owner fields</h2>
        <h3 class="inter-medium font-size-20 font-color-green">Owner description</h3>
        <p class="inter-light font-size-18">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mi arcu, bibendum vitae fringilla aliquet, hendrerit et nisi. Mauris tincidunt, sem id semper fringilla, leo elit suscipit nibh, non mollis tellus lacus ac nunc. In in tellus sollicitudin, dictum enim ut, scelerisque massa. Nullam rutrum elementum congue.</p>
        <div id="buttons">
          <button class="button-green inter-bold">Add new property</button>
          <button class="button-white inter-bold">See properties</button>
        </div>
      </div>
    </div> -->
    <div id="adminProfile">
      <div id="container">
        <h2 class="inter-medium font-size-24 font-color-green">Admin fields</h2>
        <router-link :to="{name: 'view-users'}">
          <button class="button-green inter-bold">See users</button>
        </router-link>
        <router-link :to="{name: 'view-properties'}">
          <button class="button-white inter-bold">See properties</button>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
</script>

<style scoped>
main {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
}

#normalProfile {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 4fr;
  row-gap: 1em;
  column-gap: 2em;
}

#pictureProfile,
#usernameProfile {
  display: flex;
  align-items: center;
}

#editPhoto {
  background-color: #F5F5F5;
  border-radius: 8px;
  width: 9em;
  height: 2.5em;
}

#photoBtn,
#pictureProfile {
  display: flex;
  justify-content: center;
}

h3:not(.firstName) {
  margin-top: 1.5em;
}

#buttons {
  display: flex;
  flex-direction: row;
  column-gap: 2em;
  margin-top: 2em;
}

#ownerProfile {
  margin-top: 4em;
}

#container {
  border: #B8B8B8 solid 1px;
  border-radius: 11px;
  padding: 2em;
}
</style>
