<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Référence vers l'élément HTML
const mapContainer = ref(null);

const props = defineProps({
  longitude: {
    type: Number,
    required: true // Empêche d'oublier de passer la valeur
  },
  latitude: {
    type: Number,
    required: true
  }
})

onMounted(() => {
  // 1. Coordonnées statiques (Paris)
  const latitude = props.latitude;
  const longitude = props.longitude;

  // 2. Initialisation de la carte dans la div
  const map = L.map(mapContainer.value).setView([latitude, longitude], 13);

  // 3. Chargement des images de la carte (Tiles)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // 4. Ajout d'un marqueur rouge classique
  L.marker([latitude, longitude]).addTo(map)
    .bindPopup('Vous êtes ICI')
    .openPopup();
});
</script>

<style scoped>
.map-container {
  height: 500px; /* Hauteur obligatoire */
  width: 100%;
  border: 2px solid #ccc;
  border-radius: 10px;
}
</style>