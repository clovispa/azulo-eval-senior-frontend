
<template>

  <GoogleMap api-key="AIzaSyAc9lmS3zs5HV-9kIjx3dQWTGSR1w8bLpI" style="width: 100%; height: 400px" :center="center" :zoom="15">
    <Marker     :options="{ position: center }"
                :key="index"
                ></Marker>
  </GoogleMap>
  <GoogleMap >
    <Marker

    ></Marker>
  </GoogleMap>
  <p class="title-home">Libretas de viaje </p>
</template>

<script setup lang="ts">
import {GoogleMap, Marker} from "vue3-google-map"

import {onMounted, ref} from 'vue';


const center = ref({ lat: 40.689247, lng: -74.044502 })
const markers = ref([])
const places = ref([])
const currentPlaces = ref(null)

onMounted(() => {
  geolocate()
})
function addMarker() {
  console.log(  'd')
}
function geolocate() {
  navigator.geolocation.getCurrentPosition( position => {
    center.value = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
  })
}
</script>
<style scoped>

</style>
