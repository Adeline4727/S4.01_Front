<script setup>
import { computed, onMounted, onUnmounted, ref  } from 'vue'
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
const isScrolled = ref(false)

const handleScroll = () => {
    isScrolled.value = window.scrollY > 0;
}

onMounted(() => {
    store.getAnnonceById(route.params.id);
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

</script>

<template>
    <BandeauDispoAnnonce v-if="store.annonce" :annonce="store.annonce" :class="isScrolled?'BandeauDispoAnnonce':'BandeauDispoAnnonceHidden'"/>  
  <div class="contenerPage">

  <div v-if="store.annonce" class="page">
    <PhotosAnnonce :annonce="store.annonce" class="PhotosAnnonce"/>
    <VerifDispoAnnonce :annonce="store.annonce" class="VerifDispoAnnonce"/>
    <InfosPrincipalesAnnonce :annonce="store.annonce" class="InfosPrincipalesAnnonce"/>
    <CarteInfoDetailsAnnonce :annonce="store.annonce" class="CarteInfoDetailsAnnonce"/>
    <ButtonShare />
    <LikeButton>{{ store.annonce.utilisateursInteresses.length }}</LikeButton>
  </div>
  <div v-else>Chargement...</div>
  </div>
</template>

<style scoped>
.PhotosAnnonce{
  background-color: blueviolet;
  width: 900px;
  height: 600px;
}
.BandeauDispoAnnonce {
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  top: 0;
  transform: translateY(0);
  transition: transform 0.3s ease;
}
.BandeauDispoAnnonceHidden {
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  top: 0;
  transform: translateY(-100%);
  transition: transform 0.3s ease;
}
.contenerPage{
  justify-content: center;
  display: flex;
  width: 100vw;
}
.page{
  width: 900px;
}
</style>