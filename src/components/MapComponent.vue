<template>
  <div ref="mapContainer" style="height: 500px; width: 100%">
    <l-map ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="true">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>

      <l-marker :lat-lng="center">
        <l-popup>Salut ! C'est Paris.</l-popup>
      </l-marker>
    </l-map>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

// 1. On importe le CSS et la vraie librairie Leaflet pure
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 2. Référence vers la div HTML
const mapContainer = ref(null);

// 3. On initialise la carte uniquement quand le composant est monté à l'écran
onMounted(() => {
  // Création de la carte centrée sur Paris
  const map = L.map(mapContainer.value).setView([48.8566, 2.3522], 12);

  // Ajout du fond de carte OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);

  // Ajout du marqueur et de sa popup
  L.marker([48.8566, 2.3522]).addTo(map)
    .bindPopup("Salut ! C'est Paris.")
    .openPopup();
});
</script>
