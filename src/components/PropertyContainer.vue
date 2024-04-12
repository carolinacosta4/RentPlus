<template>
    <div>
        <img :src="image" class="thumbnailHouse mb-3">
        <h1 class="inter-semiBold font-color-green">{{ name }}</h1>
        <p class="inter-light font-size-14 font-color-green">{{ location }}</p>
        <h2 class="inter-light font-color-green"><span class="inter-semiBold">{{ price }}</span> /night</h2>
    </div>
</template>

<script>
    export default {
        props: {
            image: {
                type: String,
                required: true
            },

            name: {
                type: String,
                required: true
            },

            location: {
                type: String,
                required: false
            },

            price: {
                type: String,
                required: true
            }
        },
    }
</script>

<style lang="css" scoped>
.thumbnailHouse{
    width: 162px;
    height: 162px;
    border-radius: 11px;
}
</style>