<template>
  <main class="py-8 px-4">
    <h1 class="inter-medium font-color-green font-size-24 page-title">
      Edit property {{ this.property.title }}
    </h1>

    <v-form id="form" @submit.prevent="this.editProperty">
      <div id="inputs">
        <div id="partOne" class="groupInputs">
          <div class="singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="title">Title</label>

              <p class="font-color-red inter-medium">*</p>
            </div>

            <v-text-field
              name="title"
              class="input inter-light"
              v-model="this.property.title"
              density="comfortable"
              :rules="[rules.required, rules.max50]"
              maxlength="50"
              counter
            ></v-text-field>
          </div>

          <div id="left" class="groupInputs">
            <div class="singleInput">
              <div class="label inter-medium font-size-14 font-color-black">
                <label for="price">Price/night</label>
                <p class="font-color-red inter-medium">*</p>
              </div>
              <v-text-field
                name="price"
                class="input inter-light"
                v-model="this.property.price"
                density="comfortable"
                placeholder="Ex.: 1200,00"
                :rules="[rules.required, rules.isANumber]"
              ></v-text-field>
            </div>
          </div>

          <div class="singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="mapUrl">Map URL</label>

              <p class="font-color-red inter-medium">*</p>
            </div>

            <v-text-field
              name="mapUrl"
              class="input inter-light"
              v-model="this.property.mapUrl"
              density="comfortable"
              :rules="[rules.required]"
            ></v-text-field>
          </div>

          <div class="singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="city">City</label>

              <p class="font-color-red inter-medium">*</p>
            </div>

            <v-text-field
              name="city"
              class="input inter-light"
              v-model="this.property.city"
              density="comfortable"
              :rules="[rules.required, rules.max50]"
              maxlength="50"
              counter
            ></v-text-field>
          </div>

          <div class="singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="country">Country</label>

              <p class="font-color-red inter-medium">*</p>
            </div>

            <v-autocomplete
              v-model="this.property.country"
              :items="countries"
              item-title="name"
              :rules="[rules.required]"
              label="Select an option"
            >
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
            <v-textarea
              type="text"
              name="description"
              class="input height10 inter-light"
              density="comfortable"
              v-model="this.property.description"
              :rules="[rules.required]"
              auto-grow
            ></v-textarea>
          </div>

          <div class="singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="pictures">Property pictures</label>
              <p class="font-color-red inter-medium">*</p>
            </div>
            <v-file-input
              name="pictures"
              class="input height10 inter-light"
              prepend-icon=""
              v-model="this.property.pictures"
              :rules="[rules.fileInputRules]"
              multiple
            >
              <template #prepend>
                <img
                  src="../assets/images/cloud-computing.png"
                  alt="Label Image"
                  style="width: 2.2em; height: 2em"
                />
              </template>
            </v-file-input>
          </div>
          <div class="singleInputAmenity singleInput">
            <div class="label inter-medium font-size-14 font-color-black">
              <label for="type">Choose all your amenities</label>
              <p class="font-color-red inter-medium">*</p>
            </div>

            <v-autocomplete
              id="selectAmenities"
              v-model="this.property.amenities"
              :items="amenitiesList.sort()"
              class="input select inter-light"
              label="Select an option"
              density="comfortable"
              :rules="[rules.fileInputRules]"
              multiple
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                  <span>{{ item.title }}</span>
                </v-chip>

                <span v-if="index === 2" class="text-grey text-caption align-self-center">
                  (+{{ this.property.amenities.length - 2 }} others)
                </span>
              </template>
            </v-autocomplete>
          </div>
          <div>
            <p class="label inter-medium font-size-14 font-color-black">
              Amenities chosen:
            </p>
            <li
              v-for="item in this.property.amenities"
              class="inter-light font-color-green font-size-14"
            >
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

            <v-autocomplete
              v-model="this.property.type"
              class="input select inter-light"
              :items="optionTypes.sort()"
              label="Select an option"
              density="comfortable"
              :rules="[rules.required]"
            ></v-autocomplete>
          </div>

          <div id="right" class="groupInputs">
            <div class="singleInput">
              <div class="label inter-medium font-size-14 font-color-black">
                <label for="guests">Number of Guests</label>
                <p class="font-color-red inter-medium">*</p>
              </div>
              <v-text-field
                name="guests"
                class="input inter-light"
                v-model="this.property.guests"
                density="comfortable"
                :rules="[rules.required, rules.isANumber, rules.isInteger]"
              ></v-text-field>
            </div>

            <div class="singleInput">
              <div class="label inter-medium font-size-14 font-color-black">
                <label for="beds">Number of Beds</label>
                <p class="font-color-red inter-medium">*</p>
              </div>
              <v-text-field
                name="beds"
                class="input inter-light"
                v-model="this.property.beds"
                density="comfortable"
                :rules="[rules.required, rules.isANumber, rules.isInteger]"
              ></v-text-field>
            </div>

            <div class="singleInput">
              <div class="label inter-medium font-size-14 font-color-black">
                <label for="bedrooms">Number of Bedrooms</label>
                <p class="font-color-red inter-medium">*</p>
              </div>
              <v-text-field
                name="bedrooms"
                class="input inter-light"
                v-model="this.property.bedrooms"
                density="comfortable"
                :rules="[rules.required, rules.isANumber, rules.isInteger]"
              ></v-text-field>
            </div>

            <div class="singleInput">
              <div class="label inter-medium font-size-14 font-color-black">
                <label for="bathrooms">Number of Bathrooms</label>
                <p class="font-color-red inter-medium">*</p>
              </div>
              <v-text-field
                name="bathrooms"
                class="input inter-light"
                v-model="this.property.bathrooms"
                density="comfortable"
                :rules="[rules.required, rules.isANumber, rules.isInteger]"
              ></v-text-field>
            </div>
          </div>
          <div id="buttons">
            <button
              type="cancel"
              class="font-color-green"
              @click="this.$router.push({ name: 'properties' })"
            >
              <u>Cancel</u>
            </button>
            <button type="submit" class="button-green">Save property</button>
          </div>
        </div>
      </div>
    </v-form>
  </main>
</template>

<script>
export default {
  data() {
    return {
      optionTypes: ["Igloo", "Pent-house", "Mansion", "Beach house"],
      property: {
        title: "Amazing Beach House",
        type: "Beach house",
        mapUrl: "https://maps.app.goo.gl/3bCARwDhxgYPUxPu9",
        location: "Hawaii, USA",
        country: "USA",
        city: "Hawaii",
        description:
          "Beautiful Beach House right next to the most visited beach in Hawaii",
        pictures: [
          {
            name: "Pic01.png",
          },
          {
            name: "Pic02.png",
          },
        ],
        amenities: ["TV", "Swimming pool", "Fridge"],
        price: "25",
        beds: 5,
        bedrooms: 2,
        bathrooms: 2,
        guests: 8,
      },
      amenitiesList: ["TV", "Swimming pool", "Fridge", "Pets allowed", "Wifi"],
      countries: [
        {
          name: "Portugal",
          short: "PT",
        },
        {
          name: "Brazil",
          short: "BRA",
        },
        {
          name: "United States of America",
          short: "USA",
        },
        {
          name: "United Kingdom",
          short: "UK",
        },
        {
          name: "Italy",
          short: "ITA",
        },
        {
          name: "France",
          short: "FRA",
        },
        {
          name: "Spain",
          short: "SPA",
        },
      ],
      rules: {
        required: (value) => !!value || "Required.",
        max50: (value) => value.length <= 50 || "Max. 50 characters",
        fileInputRules: (value) => value.length > 0 || "Please select at least one file.",
        isANumber: (value) => !isNaN(value) || "Please enter a valid number.",
        isInteger: (value) =>
          Number.isInteger(Number(value)) || "Please enter an integer number.",
      },
    };
  },
  methods: {
    editProperty() {
      let selectedCountry = this.countries.find(
        (country) => country.short === this.property.country
      );

      if (
        !this.property.title ||
        !this.rules.isANumber(this.property.type) ||
        !this.property.mapUrl ||
        !this.property.country ||
        !this.property.city ||
        !this.property.description ||
        //  ||
        this.property.amenities.length == 0 ||
        !this.property.type
      ) {
        throw new Error("Missing information");
      } else if (this.property.pictures.length == 0) {
        throw new Error("Add at least one picture");
      } else if (
        !this.rules.isANumber(this.property.beds) ||
        !this.rules.isInteger(this.property.beds) ||
        !this.rules.isANumber(this.property.bedrooms) ||
        !this.rules.isInteger(this.property.bedrooms) ||
        !this.rules.isANumber(this.property.bathrooms) ||
        !this.rules.isInteger(this.property.bathrooms) ||
        !this.rules.isANumber(this.property.guests) ||
        !this.rules.isInteger(this.property.guests)
      ) {
        throw new Error("Invalid number format");
      } else if (!selectedCountry) {
        throw new Error("Invalid country selected");
      } else {
        let countryShort = selectedCountry.short;
        this.property.title = this.property.title;
        this.property.price = this.property.price;
        this.property.mapUrl = this.property.mapUrl;
        this.property.location = `${this.property.city}, ${countryShort}`;
        this.property.description = this.property.description;
        this.property.pictures = this.property.pictures;
        this.property.amenities = this.property.amenities;
        this.property.type = this.property.type;
        this.property.beds = this.property.beds;
        this.property.bedrooms = this.property.bedrooms;
        this.property.bathrooms = this.property.bathrooms;
        this.property.guests = this.property.guests;
      }
    },
  },
};
</script>

<style lang="css">
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
