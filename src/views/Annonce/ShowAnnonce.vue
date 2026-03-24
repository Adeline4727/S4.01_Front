<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAnnoncesStore } from '@/stores/annonces'
import BandeauDispoAnnonce from '@/components/BandeauDispoAnnonce.vue'
import VerifDispoAnnonce from '@/components/VerifDispoAnnonce.vue'
import InfosPrincipalesAnnonce from '@/components/InfosPrincipalesAnnonce.vue'
import PhotosAnnonce from '@/components/PhotosAnnonce.vue'
import CarteInfoDetailsAnnonce from '@/components/CarteInfoDetailsAnnonce.vue'
import ButtonShare from '@/components/ButtonShare.vue'
import LikeButton from '@/components/LikeButton.vue'

const route = useRoute()
const store = useAnnoncesStore()
onMounted(() => {
    store.getAnnonceById(route.params.id);
})
</script>

<template>
    <BandeauDispoAnnonce v-if="store.annonce" :annonce="store.annonce"/>
  <div class="contenerPage">

  <div v-if="store.annonce" class="page">
    <PhotosAnnonce :annonce="store.annonce"/>
    <VerifDispoAnnonce :annonce="store.annonce"/>
    <InfosPrincipalesAnnonce :annonce="store.annonce" />
    <CarteInfoDetailsAnnonce :annonce="store.annonce"/>
    <ButtonShare />
    <LikeButton>{{ store.annonce.utilisateursInteresses.length }}</LikeButton>
  </div>
  <div v-else>Chargement...</div>
  </div>
</template>

<style scoped>
.contenerPage{
  justify-content: center;
  display: flex;
  width: 100vw;
}
.page{
  width: 900px;
}
</style>