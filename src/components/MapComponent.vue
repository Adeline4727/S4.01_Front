<script setup>
import { ref, onMounted, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: iconUrl,
  iconRetinaUrl: iconRetinaUrl,
  shadowUrl: shadowUrl,
});

const houseIcon = L.icon({
  iconUrl: '/home.svg',
  className: 'custom-house-icon',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15] // Ajouté pour que le popup s'ouvre au-dessus de l'icône et non en plein milieu
});

const props = defineProps({
  longitude: {
    type: Number,
    default: 2.2137 
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
});

const mapContainer = ref(null);
let map = null;
let markersLayer = null; 

const drawMarkers = () => {
  if (!map) return;

  if (markersLayer) {
    markersLayer.clearLayers();
  } else {
    markersLayer = L.featureGroup().addTo(map);
  }

  let markerCount = 0;
  let lastMarkerLatLng = null;

  // On affiche uniquement les marqueurs passés dans props.markers
  if (props.markers && props.markers.length > 0) {
    props.markers.forEach(marker => {
      if (marker.latitude && marker.longitude) {
        lastMarkerLatLng = [marker.latitude, marker.longitude];
        const leafletMarker = L.marker(lastMarkerLatLng, { icon: houseIcon });
        
        if (marker.titre) {
          leafletMarker.bindPopup(`<b>${marker.titre}</b>`);
        }
        
        markersLayer.addLayer(leafletMarker);
        markerCount++;
      }
    });
  }

  // Ajustement automatique de la vue de la carte
  if (markerCount === 1 && lastMarkerLatLng) {
    map.setView(lastMarkerLatLng, 15);
  } else if (markerCount > 1) {
    map.fitBounds(markersLayer.getBounds(), { padding: [50, 50], maxZoom: 16 }); 
  }
};

onMounted(() => {
  // Initialisation de la carte (centrée sur les props latitude/longitude)
  map = L.map(mapContainer.value).setView([props.latitude, props.longitude], 6);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  drawMarkers();
});

// Met à jour les marqueurs si la liste change
watch(() => props.markers, () => {
  drawMarkers();
}, { deep: true });

// Recentre la carte si les props latitude/longitude changent
watch(() => [props.latitude, props.longitude], ([newLat, newLng]) => {
  if (map) {
    map.setView([newLat, newLng], map.getZoom());
  }
});

</script>

<template>
  <div ref="mapContainer" class="map-container custom-map-style"></div>
</template>

<style scoped>
.map-container {
  height: 100%; 
  min-height: 500px;
  width: 100%;
  border: 2px solid #ccc;
  border-radius: 10px;
}

.custom-map-style {
  z-index: 1 !important;
}

:deep(.custom-house-icon) {
  font-size: 30px;
  line-height: 30px;
  text-align: center;
  
  /* Nouveau style pour le fond de l'icône */
  background-color: white; 
  border-radius: 50%; /* Remplacez par 8px si l'image SVG est coupée sur les bords */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4); 
  border: none;
}
</style>