<template>
    <main class="py-8 px-4">
        <h1 class="inter-medium font-color-green font-size-24 page-title">Add new property</h1>
        <div>
            <p class="font-color-grey inter-light font-size-18">Step 1 - Main Information</p>
            <v-progress-linear id="progressBar" color="#133E1A" model-value="33" :height="8"></v-progress-linear>
        </div>
        <v-form id="formStep1" @submit.prevent="sendInfo()">
            <div id="inputs1" class="inputPage">
                <div id="left" class="groupInputs">
                    <div class="singleInput">
                        <div class="label inter-medium font-size-14 font-color-black">
                            <label for="title">Title</label>
                            <p class="font-color-red inter-medium">*</p>
                        </div>
                        <v-text-field name="title" class="input inter-light" v-model="title" density="comfortable"
                            :rules="[rules.required, rules.max50]" maxlength="50" counter></v-text-field>
                    </div>

                    <div class="singleInput">
                        <div class="label inter-medium font-size-14 font-color-black">
                            <label for="type">Type of property</label>
                            <p class="font-color-red inter-medium">*</p>
                        </div>
                        <v-select v-model="type" class="input select inter-light" :items="optionTypes"
                            label="Select an option" density="comfortable" :rules="[rules.required]"></v-select>
                    </div>

                    <div class="singleInput">
                        <div class="label inter-medium font-size-14 font-color-black">
                            <label for="mapUrl">Map URL</label>
                            <p class="font-color-red inter-medium">*</p>
                        </div>
                        <v-text-field name="mapUrl" class="input inter-light" v-model="mapUrl" density="comfortable"
                            :rules="[rules.required]"></v-text-field>
                    </div>

                    <div class="singleInput">
                        <div class="label inter-medium font-size-14 font-color-black">
                            <label for="location">Location</label>
                            <p class="font-color-red inter-medium">*</p>
                        </div>
                        <v-text-field placeholder="Ex.: Porto, PT" name="location" class="input inter-light"
                            v-model="location" density="comfortable" :rules="[rules.required, rules.max50]"
                            maxlength="50" counter></v-text-field>
                    </div>
                </div>
                <div id="right" class="groupInputs">
                    <div class="singleInput">
                        <div class="label inter-medium font-size-14 font-color-black">
                            <label for="description">Description</label>
                            <p class="font-color-red inter-medium">*</p>
                        </div>
                        <v-textarea type="text" name="description" class="input height10 inter-light"
                            density="comfortable" v-model="description" :rules="[rules.required]"
                            auto-grow></v-textarea>
                    </div>

                    <div class="singleInput">
                        <div class="label inter-medium font-size-14 font-color-black">
                            <label for="pictures">Property pictures</label>
                            <p class="font-color-red inter-medium">*</p>
                        </div>
                        <v-file-input name="pictures" class="input height10 inter-light" prepend-icon=""
                            v-model="pictures" :rules="[rules.fileInputRules]" multiple>
                            <template #prepend>
                                <img src="../assets/images/cloud-computing.png" alt="Label Image"
                                    style="width: 2.2em; height: 2em;"></template>
                        </v-file-input>
                    </div>
                </div>
            </div>

            <div class="buttons">
                <router-link :to="{ name: 'profile' }"><button type="button"
                        class="inter-medium font-color-green font-size-14">Cancelar</button>
                </router-link>
                <button type="submit" @click="this.sendInfo('1')"
                    class="btnNextStep font-color-green inter-bold font-size-14">Next
                    step <Arrow class="font-color-green"></Arrow>
                </button>
            </div>
        </v-form>
    </main>
</template>

<script>
import Arrow from "vue-material-design-icons/ArrowRight.vue";

export default {
    data() {
        return {
            showStepOne: true,
            showStepTwo: false,
            showStepThree: false,
            property: {},
            title: "",
            type: "",
            mapUrl: "",
            location: "",
            description: "",
            pictures: [],
            optionTypes: [
                "Igloo", "Pent-house", "Mansion", "Beach house"
            ],
            rules: {
                required: value => !!value || 'Required.',
                max50: value => value.length <= 50 || 'Max. 50 characters',
                fileInputRules: value => value.length > 0 || 'Please select at least one file.'
            }
        }
    },
    components: {
        Arrow,
    },
    methods: {
        sendInfo(id) {
            if (id === '1') {

                if (!this.title || !this.type || !this.mapUrl || !this.location || !this.description || this.pictures.length == 0) {
                    console.log('error');
                }
                else {
                    this.property = {
                        title: this.title,
                        type: this.type,
                        mapUrl: this.mapUrl,
                        location: this.location,
                        description: this.description,
                        pictures: this.pictures
                    }
                    console.log(this.property);
                }

            }
            if (id === '2') {
                console.log('cancel');
            }
        }
    }
}
</script>

<style lang="css" scoped>
#progressBar {
    margin-top: 1em;
    margin-bottom: 4em
}

.input {
    width: 22em;
    height: 2.5em;
    border-radius: 6px;
    border-color: #133E1A;
}

.label {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    column-gap: 3px;
}

.select {
    width: 22em;
}

.singleInput {
    display: flex;
    flex-direction: column;
    row-gap: 0.5em;
}

::placeholder {
    color: rgba(19, 62, 26, 0.609);
    font-size: 14px
}

.groupInputs {
    display: flex;
    flex-direction: column;
    row-gap: 2.5em;
}

.inputPage {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
}

.height10 {
    height: 10em !important;
}

#formStep1 {
    display: flex;
    flex-direction: column;
    align-content: flex-end
}

.btnNextStep {
    margin-top: 2em;
    display: flex;
    flex-direction: row;
    justify-self: right;
    align-items: center;
}

.buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
</style>