<template>
  <main class="py-8 px-4">
    <h1 class="inter-medium font-color-green font-size-24 page-title">
      Add new property
    </h1>

    <div v-if="this.showStepOne">
      <p class="font-color-grey inter-light font-size-18" id="titlePage">
        Step 1 - Main Information
      </p>

      <v-progress-linear id="progressBar" color="#133E1A" model-value="33" :height="8"></v-progress-linear>
    </div>

    <div v-if="this.showStepTwo">
      <p class="font-color-grey inter-light font-size-18" id="titlePage">
        Step 2 - Amenities
      </p>

      <v-progress-linear id="progressBar" color="#133E1A" model-value="66" :height="8"></v-progress-linear>
    </div>

    <div v-if="this.showStepThree">
      <p class="font-color-grey inter-light font-size-18" id="titlePage">
        Step 3 - Price and divsions
      </p>

      <v-progress-linear id="progressBar" color="#133E1A" model-value="100" :height="8"></v-progress-linear>
    </div>

    <v-form id="form" @submit.prevent="sendInfo">
      <div id="inputs1" class="inputPage" v-if="this.showStepOne">
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
              <label for="daily_price">Price/night</label>
              <p class="font-color-red inter-medium">*</p>
            </div>
            <v-text-field name="daily_price" class="input inter-light" v-model="daily_price" density="comfortable"
              placeholder="Ex.: 1200,00" :rules="[rules.required, rules.isANumber]"></v-text-field>
          </div>

          <div class="singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="map_url">Map URL</label>

              <p class="font-color-red inter-medium">*</p>
            </div>

            <v-text-field name="map_url" class="input inter-light" v-model="map_url" density="comfortable"
              :rules="[rules.required]"></v-text-field>
          </div>

          <div class="singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="city">City</label>

              <p class="font-color-red inter-medium">*</p>
            </div>

            <v-text-field name="city" class="input inter-light" v-model="city" density="comfortable"
              :rules="[rules.required, rules.max50]" maxlength="50" counter></v-text-field>
          </div>

          <div class="singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="country">Country</label>

              <p class="font-color-red inter-medium">*</p>
            </div>

            <v-autocomplete v-model="country" :items="countries" item-title="name" :rules="[rules.required]"
              label="Select an option">
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props"></v-list-item>
              </template>
            </v-autocomplete>
          </div>
        </div>
        <div id="right" class="groupInputs">
          <div class="singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="description">Description</label>
              <p class="font-color-red inter-medium">*</p>
            </div>
            <v-textarea type="text" name="description" class="input height10 inter-light" density="comfortable"
              v-model="description" :rules="[rules.required]"></v-textarea>
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
        </div>
      </div>

      <div id="inputs2" class="inputPage" v-if="this.showStepTwo">
        <div class="singleInputAmenity">
          <div class="label inter-medium font-size-14 font-color-black">
            <label for="type">Choose all your amenities</label>
            <p class="font-color-red inter-medium">*</p>
          </div>

          <v-autocomplete id="selectAmenities" v-model="amenitiesData" :items="amenitiesName.sort()"
            class="input select inter-light" label="Select an option" density="comfortable"
            :rules="[rules.fileInputRules]" multiple>
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index < 2">
                <span>{{ item.title }}</span>
              </v-chip>

              <span v-if="index === 2" class="text-grey text-caption align-self-center">
                (+{{ amenitiesData.length - 2 }} others)
              </span>
            </template>
          </v-autocomplete>
        </div>
        <div>
          <p class="label inter-medium font-size-14 font-color-black">
            Amenities chosen:
          </p>
          <li v-for="item in amenitiesData" class="inter-light font-color-green font-size-14">
            {{ item }}
          </li>
        </div>
      </div>

      <div id="inputs3" class="inputPage" v-if="this.showStepThree">
        <div class="singleInput">
          <div class="label inter-medium font-size-14 font-color-black">
            <label for="type">Type of property</label>

            <p class="font-color-red inter-medium">*</p>
          </div>

          <v-autocomplete id="selectType" v-model="property_type" class="input select inter-light"
            :items="propertyTypesName.sort()" label="Select an option" density="comfortable"
            :rules="[rules.required]"></v-autocomplete>
        </div>

        <div id="right" class="groupInputs">
          <div class="singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="guest_number">Number of Guests</label>
              <p class="font-color-red inter-medium">*</p>
            </div>
            <v-text-field name="guest_number" class="input inter-light" v-model="guest_number" density="comfortable"
              :rules="[rules.required, rules.isANumber, rules.isInteger]"></v-text-field>
          </div>

          <div class="singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="beds">Number of Beds</label>
              <p class="font-color-red inter-medium">*</p>
            </div>
            <v-text-field name="beds" class="input inter-light" v-model="beds" density="comfortable"
              :rules="[rules.required, rules.isANumber]"></v-text-field>
          </div>

          <div class="singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="bedrooms">Number of Bedrooms</label>
              <p class="font-color-red inter-medium">*</p>
            </div>
            <v-text-field name="bedrooms" class="input inter-light" v-model="bedrooms" density="comfortable"
              :rules="[rules.required, rules.isANumber, rules.isInteger]"></v-text-field>
          </div>

          <div class="singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="bathrooms">Number of Bathrooms</label>
              <p class="font-color-red inter-medium">*</p>
            </div>
            <v-text-field name="bathrooms" class="input inter-light" v-model="bathrooms" density="comfortable"
              :rules="[rules.required, rules.isANumber, rules.isInteger]"></v-text-field>
          </div>
        </div>
      </div>

      <div v-if="showStepThree" class="inter-light" id="checkbox">
          <input type="checkbox" id="terms" name="terms" v-model="checkbox" class="font-color-green">
          <label for="PrivacyPolicy" class="font-color-green">I consent on sharing my information online and I have read the Privacy Policy</label>
      </div>
      <div class="error-message">
          <p v-if="showError" class="font-size-13 inter-medium">{{ errorMessage }}</p>
        </div>

      <div class="buttons">
        <div>
          <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <button type="button" class="inter-medium font-color-green font-size-14" v-bind="activatorProps">
                Cancelar
              </button>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card>
                <v-card-text>
                  <h1 class="page-title font-size-18 inter-semiBold font-color-green">
                    Are you sure you want to close this page?
                  </h1>
                  <p class="inter-light font-size-14">
                    This action cannot be undone. Unsaved changes may be lost.
                  </p>
                </v-card-text>

                <v-card-actions id="containerBtn">
                  <div class="btnsModal">
                    <button class="inter-medium button-border-green" @click="isActive.value = false">
                      No
                    </button>
                    <button class="inter-medium button-green"
                      @click="$router.push({ name: 'profile', params: { id: loggedUser } })">
                      Yes, cancel
                    </button>
                  </div>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </div>

        <div class="pagination">
          <button type="button" @click="paginationBack" class="btnNextStep font-color-green inter-medium font-size-14"
            v-if="!showStepOne">
            <ArrowLeft class="font-color-green"></ArrowLeft>Previous step
          </button>
          <button type="submit" @click="sendInfo" class="btnNextStep font-color-green inter-bold font-size-14"
            v-if="!showStepThree">
            Next step<ArrowRight class="font-color-green"> </ArrowRight>
          </button>
          <button type="submit" @click="createProperty" class="button-green btnNextStepFinal inter-bold"
            v-if="showStepThree">
            Create property
          </button>
        </div>
      </div>
    </v-form>

    <v-dialog max-width="500" v-model="showModal">
      <template v-slot:default="{ isActive }">
        <v-card class="green-bg">
          <v-card-text>
            <h1 class="page-title font-size-18 inter-semiBold font-color-white">
              Congratulations!
            </h1>
            <h2 class="font-size-14 inter-semiBold font-color-white">
              Your property is available on our app!
            </h2>
            <p class="inter-light font-size-14 font-color-white">
              Check your owners page to see your previous, pending and current guests.
              Also you can edit your property information as many times you want!
            </p>
          </v-card-text>

          <v-card-actions id="containerBtn" class="btnsModalCongratulations">
            <button class="inter-medium button-white"
              @click="$router.push({ name: 'profile', params: { id: loggedUser } })">
              Continue
            </button>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </main>
</template>

<script>
import ArrowRight from "vue-material-design-icons/ArrowRight.vue";
import ArrowLeft from "vue-material-design-icons/ArrowLeft.vue";
import { usePropertiesStore } from "@/stores/properties";
import { useAmenitiesStore } from "@/stores/amenities";
import { usePropertyTypesStore } from "@/stores/propertyTypes";
import { useUsersStore } from "@/stores/users";

export default {
  data() {
    return {
      showStepOne: true,
      showStepTwo: false,
      showStepThree: false,
      checkbox: false,
      showModal: false,
      title: "",
      property_type: "",
      map_url: "",
      location: "",
      description: "",
      country: "",
      city: "",
      daily_price: 0,
      beds: 0,
      bedrooms: 0,
      bathrooms: 0,
      guest_number: 0,
      amenitiesData: [],
      photos: [],
      newProperty: {},
      newType: 0,
      photosArray: [],
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
        fileInputRules: (value) => value.length > 0 || "Please select at least one file.",
        isANumber: (value) => !isNaN(value) || "Please enter a valid number.",
        isInteger: (value) =>
          Number.isInteger(Number(value)) || "Please enter an integer number.",
        checkboxRequired: (value) =>
          value || "Please consent on sharing your information online.",
      },
      propertiesStore: usePropertiesStore(),
      amenitiesStore: useAmenitiesStore(),
      propertyTypesStore: usePropertyTypesStore(),
      usersStore: useUsersStore(),
      images: [],
      showError: false,
      errorMessage: '',
    };
  },
  components: {
    ArrowRight,
    ArrowLeft,
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
    }
  },
  async created() {
    await this.amenitiesStore.fetchAmenitiesName()
    await this.amenitiesStore.fetchAmenities()
    await this.propertyTypesStore.fetchPropertyTypes()
    await this.propertyTypesStore.fetchPropertyTypesName()
    await this.usersStore.fetchUserLogged(this.loggedUser)
  },
  methods: {
    async sendInfo() {
      if (this.showStepOne) {
        let selectedCountry = this.countries.find(
          (country) => country.name === this.country
        );

        if (
          !this.title ||
          !this.rules.isANumber(this.daily_price) ||
          !this.map_url ||
          !this.country ||
          !this.city ||
          !this.description ||
          this.photos.length == 0
        ) {
          throw new Error("Missing information");
        } else {
          try {
            for (let file of this.photos) {
              this.images.push(file)
            }
          } catch (err) {
            console.error('Erro:', err);
          }

          let countryShort = selectedCountry.short;
          this.newProperty.owner_username = this.loggedUser;
          this.newProperty.title = this.title;
          this.newProperty.daily_price = parseInt(this.daily_price, 10);
          this.newProperty.map_url = this.map_url;
          this.newProperty.location = `${this.city}, ${countryShort}`;
          this.newProperty.description = this.description;

          this.showStepOne = false;
          this.showStepTwo = true;
        }
      }
      if (this.showStepTwo) {
        if (this.amenitiesData.length == 0) {
          this.showStepThree = false;
        } else {
          let newAmenities = this.amenities
            .filter((a) => this.amenitiesData.includes(a.amenity_name))
            .map((a) => a.ID);
          this.newProperty.amenities = newAmenities;

          this.showStepTwo = false;
          this.showStepThree = true;
        }
      }

      if (this.showStepThree) {
        if (
          !this.rules.isANumber(this.beds) ||
          !this.rules.isANumber(this.bedrooms) ||
          !this.rules.isANumber(this.bathrooms) ||
          !this.rules.isANumber(this.guest_number)
        ) {
          throw new Error("Invalid number format");
        }
        else if (!this.checkbox) {
          this.showError = true
          this.errorMessage = 'You have to agree with our terms!';
        }
        else {
          if (this.property_type != "") {
            this.newType = this.propertyTypes.find((t) => this.property_type.includes(t.type_name)).ID
            this.newProperty.property_type = this.newType;
          }

          this.newProperty.beds = this.beds;
          this.newProperty.bedrooms = this.bedrooms;
          this.newProperty.bathrooms = this.bathrooms;
          this.newProperty.guest_number = this.guest_number;
        }
      }

    },
    paginationBack() {
      if (this.showStepTwo) {
        this.showStepTwo = false;
        this.showStepOne = true;
      }

      if (this.showStepThree) {
        this.showStepThree = false;
        this.showStepTwo = true;
      }
    },
    async createProperty() {
      try {
        await this.sendInfo()
        let formDataImg = new FormData()
        formDataImg.append("owner_username", this.newProperty.owner_username)
        formDataImg.append("title", this.newProperty.title)
        formDataImg.append("daily_price", this.newProperty.daily_price)
        formDataImg.append("map_url", this.newProperty.map_url)
        formDataImg.append("location", this.newProperty.location)
        formDataImg.append("description", this.newProperty.description)

        formDataImg.append("amenities", this.newProperty.amenities)
        formDataImg.append("property_type", this.newProperty.property_type)
        formDataImg.append("beds", this.newProperty.beds)
        formDataImg.append("bedrooms", this.newProperty.bedrooms)
        formDataImg.append("bathrooms", this.newProperty.bathrooms)
        formDataImg.append("guest_number", this.newProperty.guest_number)

        for (let img of this.images){
          formDataImg.append("inputPropertyImages", img)
        }

        if (this.checkbox) {
          await this.propertiesStore.create(formDataImg)
          this.showModal = true;
        }
        else {
          new Error("Consent not given");
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>

<style lang="css" scoped>
#progressBar {
  margin-top: 1em;
  margin-bottom: 4em;
}

.input {
  width: 22em;
  height: 2.5em;
  border-radius: 6px;
  border-color: #133e1a;
}

#selectAmenities {
  width: 100em !important;
  max-height: 2.5em !important;
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

.singleInputAmenity {
  display: flex;
  flex-direction: column;
  align-items: left;
  row-gap: 0.5em;
}

::placeholder {
  color: rgba(19, 62, 26, 0.609);
  font-size: 14px;
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

#form {
  display: flex;
  flex-direction: column;
  align-content: flex-end;
}

.btnNextStep {
  margin-top: 2em;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-self: right;
  align-items: center;
  column-gap: 0.5em;
}

#selectType {
  height: 200em !important;
}

#checkbox {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 4em;
  column-gap: 0.5em;
}

.btnNextStepFinal {
  margin-top: 2em;
  display: flex;
  flex-direction: row;
  align-items: center !important;
  justify-content: center;
  column-gap: 0.5em;
}

.pagination {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap !important;
  justify-content: flex-end;
  align-items: center !important;
  column-gap: 2.5em;
}

.buttons {
  display: flex;
  flex-direction: row;
  align-items: baseline !important;
  flex-wrap: nowrap !important;
  justify-content: space-around;
}

#containerBtn {
  display: block;
}

.btnsModal {
  display: flex;
  flex-direction: row;
  justify-content: right;
  padding: 0.5rem 1rem 0.13rem;
  column-gap: 1rem;
}

.btnsModalCongratulations {
  padding: 1.5em;
}

.error-message {
  color: rgb(168, 6, 6);
  margin-bottom: 1em;
  text-align: center;
}
</style>