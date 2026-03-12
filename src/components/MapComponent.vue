<template>
    <div style="height: 500px; width: 100%">
      <l-map ref="map" v-model:zoom="zoom" :center="[48.8566, 2.3522]" :use-global-leaflet="false">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
  
        <l-marker :lat-lng="[48.8566, 2.3522]">
          <l-popup>Salut ! C'est Paris.</l-popup>
        </l-marker>
      </l-map>
    </div>
  </template>
  
  <script setup>
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
  import { ref } from "vue";
  
  const zoom = ref(12);
  </script>