<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAnnoncesStore } from '@/stores/annonces'
import BandeauDispoAnnonce from '@/components/BandeauDispoAnnonce.vue'
import VerifDispoAnnonce from '@/components/VerifDispoAnnonce.vue'
import InfosPrincipalesAnnonce from '@/components/InfosPrincipalesAnnonce.vue'
import MapComponent from '@/components/MapComponent.vue'
import PhotosAnnonce from '@/components/PhotosAnnonce.vue'
import CarteInfoDetailsAnnonce from '@/components/CarteInfoDetailsAnnonce.vue'
// import ButtonShare from '@/components/ButtonShare.vue'
import LikeButton from '@/components/LikeButton.vue'

const route = useRoute()
const store = useAnnoncesStore()
const annonce = computed(() => store.getAnnonceById(route.params.id))

onMounted(() => {
    if (!store.annonces.length) {
        store.fetchAnnonces()
    }
})
</script>

<template>
  <div v-if="annonce">
    <BandeauDispoAnnonce />
    <PhotosAnnonce />
    <VerifDispoAnnonce />
    <InfosPrincipalesAnnonce :annonce="annonce" />
    <CarteInfoDetailsAnnonce />
    <!-- <ButtonShare /> -->
    <!-- <LikeButton /> -->
    <!-- <MapComponent 
  v-if="annonce && annonce.adresseBien" 
  :latitude="annonce.adresseBien.latitude" 
  :longitude="annonce.adresseBien.longitude" 
/> -->
  </div>
  <div v-else>Chargement...</div>
</template>