<script setup>
import { ref, onMounted, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// --- IMPORT DIRECT DES IMAGES (MÉTHODE INFAILLIBLE POUR VITE) ---
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: iconUrl,
  iconRetinaUrl: iconRetinaUrl,
  shadowUrl: shadowUrl,
});
// -----------------------------------------------------------------

const props = defineProps({
  longitude: {
    type: Number,
    default: 2.2137 // Centre de la France par défaut
  },
  latitude: {
    type: Number,
    default: 46.2276
  }, 
  markers: {
    type: Array,
    required: false,
    default: () => []
  }
})

const mapContainer = ref(null);
let map = null;
let markersLayer = null; 

const drawMarkers = () => {
  // 🔍 DEBUG : Regarde dans la console de ton navigateur (F12) ce que ce log affiche !
  console.log("Données reçues par la map :", props.markers);

  if (!map) return;

  if (markersLayer) {
    markersLayer.clearLayers();
  } else {
    markersLayer = L.featureGroup().addTo(map);
  }

  if (!props.markers || props.markers.length === 0) return;

  props.markers.forEach(marker => {
    // On s'assure que les coordonnées existent et sont bien des nombres
    if (marker.latitude && marker.longitude) {
      const leafletMarker = L.marker([marker.latitude, marker.longitude]);
      
      if (marker.titre) {
        leafletMarker.bindPopup(`<b>${marker.titre}</b>`);
      }
      
      markersLayer.addLayer(leafletMarker);
    }
  });

  if (markersLayer.getLayers().length > 0) {
    map.fitBounds(markersLayer.getBounds(), { padding: [30, 30], maxZoom: 15 }); 
  }
};

onMounted(() => {
  map = L.map(mapContainer.value).setView([props.latitude, props.longitude], 6);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  drawMarkers();
});

watch(() => props.markers, () => {
  drawMarkers();
}, { deep: true });

</script>

<template>
  <div ref="mapContainer" class="map-container custom-map-style"></div>
</template>



<style scoped>
.map-container {
  height: 100%; /* S'adapte au parent */
  min-height: 500px;
  width: 100%;
  border: 2px solid #ccc;
  border-radius: 10px;
}

.custom-map-style {
  z-index: 1 !important;
}
</style>