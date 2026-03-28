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
import DatePicker from '@/components/DatePicker.vue'

const route = useRoute()
const store = useAnnoncesStore()
const isScrolled = ref(false)
const showDatePicker = ref(false)

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
    <VerifDispoAnnonce :annonce="store.annonce" class="VerifDispoAnnonce" @click="showDatePicker = true"/>
    <InfosPrincipalesAnnonce :annonce="store.annonce" class="InfosPrincipalesAnnonce"/>
    <CarteInfoDetailsAnnonce :annonce="store.annonce" class="CarteInfoDetailsAnnonce"/>
    <ButtonShare />
    <LikeButton>{{ store.annonce.utilisateursInteresses.length }}</LikeButton>
  </div>
  <div v-else>Chargement...</div>
  </div>
  <div v-if="showDatePicker && store.annonce" class="modal-overlay" @click.self="showDatePicker = false">
    <div class="modal-content">
      <button class="close-modal-btn" @click="showDatePicker = false">&times;</button>
      
      <DatePicker :annonce="store.annonce"></DatePicker>
    </div>
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Noir transparent */
  display: flex;
  justify-content: center; /* Centre horizontalement */
  align-items: center;     /* Centre verticalement */
  z-index: 9999;           /* Au-dessus de tout le reste (notamment ton bandeau) */
}

/* Le conteneur spécifique du composant */
.modal-content {
  position: relative;
  /* L'animation d'apparition (optionnel mais plus joli) */
  animation: popIn 0.3s ease-out forwards;

  background-color: #ffffff; 
  border-radius: 16px;       /* Pour les bords arrondis */
  padding: 32px;             /* Pour donner de l'espace autour du calendrier */
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2); /* La petite ombre qui fait pro */
}

/* Le bouton pour fermer la modale */
.close-modal-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  z-index: 10;
  color: #222;
}

.close-modal-btn:hover {
  color: #ff5a5f;
}

/* Petite animation d'apparition douce */
@keyframes popIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>