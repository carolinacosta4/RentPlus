<template>
  <div v-if="loggedUser != property.owner_username" id="ohNo">
    <h1 class=" font-color-green font-size-24 inter-semiBold">Oh no...</h1>
    <h1 class="inter-light font-color-green font-size-18">You have no permission to access this page</h1>
  </div>

  <main v-else class="py-8 px-4">
    <h1 class="inter-medium font-color-green font-size-24 page-title">
      Edit property {{ property.title }}
    </h1>

    <v-form id="form" @submit.prevent="editProperty">
      <div id="inputs">
        <div id="partOne" class="groupInputs">
          <div class="singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="title">Title</label>

              <p class="font-color-red inter-medium">*</p>
            </div>

            <v-text-field name="title" class="input inter-light" v-model="property.title" density="comfortable"
              :rules="[rules.required, rules.max50]" maxlength="50" counter></v-text-field>
          </div>

          <div id="left" class="groupInputs">
            <div class="singleInput">
              <div class="label inter-medium font-size-14 font-color-black">
                <label for="price">Price/night</label>
                <p class="font-color-red inter-medium">*</p>
              </div>
              <v-text-field name="price" class="input inter-light" v-model="property.daily_price" density="comfortable"
                placeholder="Ex.: 1200,00" :rules="[rules.required, rules.isANumber]"></v-text-field>
            </div>
          </div>

          <div class="singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="map_url">Map URL</label>

              <p class="font-color-red inter-medium">*</p>
            </div>

            <v-text-field name="map_url" class="input inter-light" v-model="property.map_url" density="comfortable"
              :rules="[rules.required]"></v-text-field>
          </div>

          <div class="singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="city">City</label>

              <p class="font-color-red inter-medium">*</p>
            </div>

            <v-text-field name="city" class="input inter-light" v-model="property.city" density="comfortable"
              :rules="[rules.required, rules.max50]" maxlength="50" counter></v-text-field>
          </div>

          <div class="singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="country">Country</label>

              <p class="font-color-red inter-medium">*</p>
            </div>

            <v-autocomplete v-model="property.country" :items="countries" item-title="name" :rules="[rules.required]"
              label="Select an option">
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props"></v-list-item>
              </template>
            </v-autocomplete>
          </div>
        </div>

        <div id="partTwo" class="groupInputs">
          <div class="singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="description">Description</label>
              <p class="font-color-red inter-medium">*</p>
            </div>
            <v-textarea type="text" name="description" class="input height10 inter-light" density="comfortable"
              v-model="property.description" :rules="[rules.required]"></v-textarea>
          </div>

          <div class="singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="photos">Property photos</label>
              <p class="font-color-red inter-medium">*</p>
            </div>
            <v-file-input name="photos" class="input height10 inter-light" prepend-icon="" v-model="photos"
              :rules="[rules.fileInputRules]" multiple>
              <template #prepend>
                <img src="../assets/images/cloud-computing.png" alt="Label Image" style="width: 2.2em; height: 2em" />
              </template>
            </v-file-input>
          </div>
          <div class="singleInputAmenity singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="type">Choose all your amenities</label>
              <p class="font-color-red inter-medium">*</p>
            </div>

            <v-autocomplete id="selectAmenities" v-model="property.amenities" :items="amenitiesName.sort()"
              class="input select inter-light" label="Select an option" density="comfortable"
              :rules="[rules.fileInputRules]" multiple>
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                  <span>{{ item.title }}</span>
                </v-chip>

                <span v-if="index === 2" class="text-grey text-caption align-self-center">
                  (+{{ property.amenities.length - 2 }} others)
                </span>
              </template>
            </v-autocomplete>
          </div>
          <div>
            <p class="label inter-medium font-size-14 font-color-black">
              Amenities chosen:
            </p>
            <li v-for="item in property.amenities" class="inter-light font-color-green font-size-14">
              {{ item }}
            </li>
          </div>
        </div>

        <div id="partThree" class="groupInputs">
          <div class="singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="type">Type of property</label>

              <p class="font-color-red inter-medium">*</p>
            </div>

            <v-autocomplete v-model="property.property_type" class="input select inter-light"
              :items="propertyTypesName.sort()" label="Select an option" density="comfortable"
              :rules="[rules.required]"></v-autocomplete>
          </div>

          <div id="right" class="groupInputs">
            <div class="singleInput">
              <div class="label inter-medium font-size-14 font-color-black">
                <label for="guest_number">Number of Guests</label>
                <p class="font-color-red inter-medium">*</p>
              </div>
              <v-text-field name="guest_number" class="input inter-light" v-model="property.guest_number"
                density="comfortable" :rules="[rules.required, rules.isANumber, rules.isInteger]"></v-text-field>
            </div>

            <div class="singleInput">
              <div class="label inter-medium font-size-14 font-color-black">
                <label for="beds">Number of Beds</label>
                <p class="font-color-red inter-medium">*</p>
              </div>
              <v-text-field name="beds" class="input inter-light" v-model="property.beds" density="comfortable"
                :rules="[rules.required, rules.isANumber, rules.isInteger]"></v-text-field>
            </div>

            <div class="singleInput">
              <div class="label inter-medium font-size-14 font-color-black">
                <label for="bedrooms">Number of Bedrooms</label>
                <p class="font-color-red inter-medium">*</p>
              </div>
              <v-text-field name="bedrooms" class="input inter-light" v-model="property.bedrooms" density="comfortable"
                :rules="[rules.required, rules.isANumber, rules.isInteger]"></v-text-field>
            </div>

            <div class="singleInput">
              <div class="label inter-medium font-size-14 font-color-black">
                <label for="bathrooms">Number of Bathrooms</label>
                <p class="font-color-red inter-medium">*</p>
              </div>
              <v-text-field name="bathrooms" class="input inter-light" v-model="property.bathrooms"
                density="comfortable" :rules="[rules.required, rules.isANumber, rules.isInteger]"></v-text-field>
            </div>
          </div>
          <div id="buttons">
            <button type="cancel" class="font-color-green" @click="this.$router.push({ name: 'properties' })">
              <u>Cancel</u>
            </button>
            <button type="submit" class="button-green">Save property</button>
          </div>
        </div>
      </div>
    </v-form>

    <v-dialog max-width="500" v-model="showModal">
      <template v-slot:default="{ isActive }">
        <v-card class="green-bg">
          <v-card-text>
            <h1 class="page-title font-size-18 inter-semiBold font-color-white">
              Property edited!
            </h1>
            <h2 class="font-size-14 inter-semiBold font-color-white">
              Your new property information is already available on our app!
            </h2>
            <p class="inter-light font-size-14 font-color-white">
              Check your owners page to see your previous, pending and current guests!
            </p>
          </v-card-text>

          <v-card-actions id="containerBtn" class="btnsModalCongratulations">
            <button class="inter-medium button-white"
              @click="manageClose">
              Close
            </button>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </main>

</template>

<script>
import { usePropertiesStore } from "@/stores/properties";
import { useAmenitiesStore } from "@/stores/amenities";
import { usePropertyTypesStore } from "@/stores/propertyTypes";
import { useUsersStore } from "@/stores/users";

export default {
  data() {
    return {
      property: {
        title: '',
        daily_price: '',
        map_url: '',
        city: '',
        country: '',
        description: '',
        amenities: [],
        property_type: '',
        guest_number: '',
        beds: '',
        bedrooms: '',
        bathrooms: ''
      },
      editedProperty: {},
      countries: [
        { name: "Argentina", short: "ARG" },
        { name: "Australia", short: "AUS" },
        { name: "Austria", short: "AUT" },
        { name: "Belgium", short: "BEL" },
        { name: "Brazil", short: "BRA" },
        { name: "Canada", short: "CAN" },
        { name: "China", short: "CHN" },
        { name: "Denmark", short: "DNK" },
        { name: "Egypt", short: "EGY" },
        { name: "Finland", short: "FIN" },
        { name: "France", short: "FRA" },
        { name: "Germany", short: "DEU" },
        { name: "Greece", short: "GRC" },
        { name: "India", short: "IND" },
        { name: "Ireland", short: "IRL" },
        { name: "Italy", short: "ITA" },
        { name: "Japan", short: "JPN" },
        { name: "Mexico", short: "MEX" },
        { name: "Netherlands", short: "NLD" },
        { name: "New Zealand", short: "NZL" },
        { name: "Norway", short: "NOR" },
        { name: "Portugal", short: "PT" },
        { name: "Russia", short: "RUS" },
        { name: "South Africa", short: "ZAF" },
        { name: "South Korea", short: "KOR" },
        { name: "Spain", short: "ESP" },
        { name: "Sweden", short: "SWE" },
        { name: "Switzerland", short: "CHE" },
        { name: "Turkey", short: "TUR" },
        { name: "United Kingdom", short: "UK" },
        { name: "United States of America", short: "USA" }
      ].sort((a, b) => a.name.localeCompare(b.name)),

      rules: {
        required: (value) => !!value || "Required.",
        max50: (value) => value.length <= 50 || "Max. 50 characters",
        fileInputRules: (value) => value.length > 0 || "Please select at least one file.",   // VOLTAR AQUI
        isANumber: (value) => !isNaN(value) || "Please enter a valid number.",
        isInteger: (value) =>
          Number.isInteger(Number(value)) || "Please enter an integer number.",
      },
      propertiesStore: usePropertiesStore(),
      amenitiesStore: useAmenitiesStore(),
      propertyTypesStore: usePropertyTypesStore(),
      usersStore: useUsersStore(),
      photos: [],
      showModal: false
    };
  },
  computed: {
    amenitiesName() {
      return this.amenitiesStore.getAmenitiesName;
    },
    propertyTypes() {
      return this.propertyTypesStore.getPropertyTypes;
    },
    propertyTypesName() {
      return this.propertyTypesStore.getPropertyTypesName;
    },
    loggedUser() {
      return this.usersStore.getUserLogged;
    },
    loggedUserInfo() {
      return this.usersStore.getUserLoggedInfo
    },
    amenities() {
      return this.amenitiesStore.getAmenities
    },
  },
  async created() {
    // localStorage.clear()
    await this.amenitiesStore.fetchAmenitiesName()
    await this.amenitiesStore.fetchAmenities()
    await this.propertyTypesStore.fetchPropertyTypes()
    await this.propertyTypesStore.fetchPropertyTypesName()
    await this.usersStore.fetchUserLogged(this.loggedUser)
    this.loadProperty();
  },
  methods: {
    async loadProperty() {
      const property = await this.propertiesStore.fetchProperty(this.$route.params.id);
      this.property = property;

      this.property.city = property.location.split(', ')[0]

      let countryShort = property.location.split(', ')[1]
      let country = this.countries.find((c) => c.short == countryShort)
      this.property.country = country.name

      this.property.amenities = property.amenities.map(a => a.amenity_name)

      let type = this.propertyTypes.find(item => item.ID === property.property_type);
      this.property.property_type = type.type_name
    },
    async editProperty() {
      const property = await this.propertiesStore.fetchProperty(this.$route.params.id);

      // let countryShort = property.location.split(', ')[1]
      let selectedCountry = this.countries.find((c) => c.name == this.property.country)
      
      if (
        !property.title ||
        !property.map_url ||
        !property.description ||
        // property.amenities.length == 0 ||
        !property.property_type
      ) {
        throw new Error("Missing information");
      } else if (property.photos.length == 0) {
        throw new Error("Add at least one picture");
      } else if (
        !this.rules.isANumber(property.beds) ||
        !this.rules.isInteger(property.beds) ||
        !this.rules.isANumber(property.bedrooms) ||
        !this.rules.isInteger(property.bedrooms) ||
        !this.rules.isANumber(property.bathrooms) ||
        !this.rules.isInteger(property.bathrooms) ||
        !this.rules.isANumber(property.guest_number) ||
        !this.rules.isInteger(property.guest_number)
      ) {
        throw new Error("Invalid number format");
      } else if (selectedCountry == "") {
        throw new Error("Invalid country selected");
      } else {
        let countryShort = selectedCountry.short;

        let amenitiesInfo = []
        this.property.amenities.map(name => {
          let amenity = this.amenities.find(item => item.amenity_name === name);
          amenitiesInfo.push(amenity.ID)
        });

        let type = this.propertyTypes.find(item => item.type_name === this.property.property_type);

        let formDataImg = new FormData()
        formDataImg.append("id", this.$route.params.id)
        formDataImg.append("title", this.property.title)
        formDataImg.append("daily_price", this.property.daily_price)
        formDataImg.append("map_url", this.property.map_url)
        formDataImg.append("location", `${this.property.city}, ${countryShort}`)
        formDataImg.append("description", this.property.description)

        formDataImg.append("amenities", amenitiesInfo)
        formDataImg.append("property_type", type.ID)
        formDataImg.append("beds", this.property.beds)
        formDataImg.append("bedrooms", this.property.bedrooms)
        formDataImg.append("bathrooms", this.property.bathrooms)
        formDataImg.append("guest_number", this.property.guest_number)
        for (let img of this.photos){
          formDataImg.append("inputPropertyImages", img)
        }

        await this.propertiesStore.editProperty(this.$route.params.id, formDataImg);
        this.showModal = true;
      }
    },
    async manageClose(){
      this.showModal = false
      this.$router.push({ name: 'properties' })
    }
  },
};
</script>

<style lang="css">
#ohNo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  row-gap: 1em;
}

.inputPage {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
}

#inputs {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.groupInputs {
  display: flex;
  flex-direction: column;
  row-gap: 2.5em;
}

.singleInput {
  width: 20em;
}

.label {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  column-gap: 3px;
}

.singleInputAmenity {
  display: flex;
  flex-direction: column;
  align-items: left;
  row-gap: 0.5em;
}

#selectAmenities {
  width: 20em !important;
}

#buttons {
  display: flex;
  flex-direction: row;
  column-gap: 1.5em;
  justify-content: right;
}
</style>
