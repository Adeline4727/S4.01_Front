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
  iconSize: [30, 30], // Plus grand (avant: 30x30)
  iconAnchor: [15, 15], // La moitié de 44 pour bien centrer
  popupAnchor: [0, -22] 
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

  
  if (props.markers && props.markers.length > 0) {
    props.markers.forEach(marker => {
      if (marker.latitude && marker.longitude) {
        lastMarkerLatLng = [marker.latitude, marker.longitude];

        
        const zoneCircle = L.circle(lastMarkerLatLng, {
          color: '#808080',     // Couleur de la bordure du cercle (gris)
          weight: 1,            // Épaisseur de la bordure
          fillColor: '#808080', // Couleur de remplissage (gris)
          fillOpacity: 0.25,    // Transparence du fond (25%)
          radius: 500           // Rayon en mètres (vous pouvez modifier cette valeur)
        });
        markersLayer.addLayer(zoneCircle);

        
        const leafletMarker = L.marker(lastMarkerLatLng, { icon: houseIcon });
        
        if (marker.titre) {
          leafletMarker.bindPopup(`<b>${marker.titre}</b>`);
        }
        
        markersLayer.addLayer(leafletMarker);
        markerCount++;
      }
    });
  }

  
  if (markerCount === 1 && lastMarkerLatLng) {
    
    map.setView(lastMarkerLatLng, 14);
  } else if (markerCount > 1) {
    
    map.fitBounds(markersLayer.getBounds(), { padding: [50, 50], maxZoom: 16 }); 
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

  text-align: center;
  
 
  background-color: white; 
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4); 
  
  
  padding: 8px; 
  box-sizing: border-box; 
  border: none;
}
</style>