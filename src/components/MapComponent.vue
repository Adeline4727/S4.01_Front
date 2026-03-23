<template>
  <div ref="mapContainer" class="map-container custom-map-style"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 🔧 FIX obligatoire pour les icônes Leaflet avec les builders modernes (Vite/Webpack)
// Sans ça, les marqueurs sont invisibles ou cassés.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const props = defineProps({
  // Tes props originales (peuvent servir de centre par défaut si pas de markers)
  longitude: {
    type: Number,
    default: 2.2137 // Centre de la France par défaut
  },
  latitude: {
    type: Number,
    default: 46.2276
  }, 
  // Le tableau d'annonces que l'on va utiliser
  markers: {
    type: Array,
    required: false,
    default: () => []
  }
})

// Référence vers l'élément HTML
const mapContainer = ref(null);
let map = null;
let markersLayer = null; // Groupe pour stocker les marqueurs et les effacer facilement

// Fonction isolée pour dessiner les marqueurs
const drawMarkers = () => {
  if (!map) return;

  // 1. On nettoie les anciens marqueurs s'ils existent
  if (markersLayer) {
    markersLayer.clearLayers();
  } else {
    markersLayer = L.featureGroup().addTo(map);
  }

  // 2. Si pas de markers, on s'arrête là
  if (!props.markers || props.markers.length === 0) return;

  // 3. On boucle sur le tableau pour ajouter les points
  props.markers.forEach(marker => {
    // Vérification de sécurité sur les coordonnées
    if (marker.latitude && marker.longitude) {
      const leafletMarker = L.marker([marker.latitude, marker.longitude]);
      
      // Ajout d'une popup si un titre existe
      if (marker.titre) {
        leafletMarker.bindPopup(`<b>${marker.titre}</b>`);
      }
      
      markersLayer.addLayer(leafletMarker);
    }
  });

  // 4. Ajustement automatique du zoom pour voir TOUS les marqueurs
  if (markersLayer.getLayers().length > 0) {
    // padding: évite que les marqueurs soient collés aux bords
    map.fitBounds(markersLayer.getBounds(), { padding: [20, 20] }); 
  }
};

onMounted(() => {
  // Initialisation de la carte (vue initiale temporaire)
  map = L.map(mapContainer.value).setView([props.latitude, props.longitude], 6);

  // Chargement des images de la carte (Tiles)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Dessiner les marqueurs une première fois
  drawMarkers();
});

// IMPORTANT : On surveille les changements du tableau markers.
// Si l'utilisateur change de ville dans la recherche, la carte se mettra à jour.
watch(() => props.markers, () => {
  drawMarkers();
}, { deep: true });

</script>

<style scoped>
.map-container {
  height: 500px; /* Ta hauteur obligatoire */
  width: 100%;
  border: 2px solid #ccc;
  border-radius: 10px;
}

/* Petit hack CSS souvent nécessaire : Leaflet a un z-index très élevé (400+).
  Si tu as des menus déroulants ou un header sticky dans ton app, la carte risque de passer devant.
  On force un z-index bas sur le conteneur principal.
*/
.custom-map-style {
  z-index: 1 !important;
}
</style>