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

const liked = ref(false)
</script>

<template>
    <BandeauDispoAnnonce v-if="store.annonce" :annonce="store.annonce" :class="isScrolled ? 'BandeauVisible' : 'BandeauCache'"/>  
    <div class="contenerPage">
        <div v-if="store.annonce" class="page">
            <div class="colonnes">

                <div class="colonneGauche">
                    <div class="boutons">
                        <ButtonShare class="share-button"></ButtonShare>
                        <LikeButton class="like-button" v-model:liked="liked"></LikeButton>
                    </div>
                    <PhotosAnnonce :annonce="store.annonce"/>
                    <InfosPrincipalesAnnonce :annonce="store.annonce" class="infosPrincipales"/>
                </div>

                <div class="colonneDroite">
                    <VerifDispoAnnonce :annonce="store.annonce"/>
                </div>

            </div>

            <CarteInfoDetailsAnnonce :annonce="store.annonce"/>
        </div>
        <div v-else>Chargement...</div>
    </div>
</template>

<style scoped>
.BandeauVisible {
    position: fixed;
    z-index: 10;
    left: 0; right: 0; top: 0;
    transform: translateY(0);
    transition: transform 0.3s ease;
}
.BandeauCache {
    position: fixed;
    z-index: 10;
    left: 0; right: 0; top: 0;
    transform: translateY(-100%);
    transition: transform 0.3s ease;
}
.contenerPage {
    display: flex;
    justify-content: center;
    padding-bottom: 40px;
}
.page {
    width: 100%;
    max-width: 960px;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.colonnes {
  margin-top: 20px;
    display: flex;
    gap: 24px;
    align-items: flex-start;
}
.colonneGauche {
    flex: 2;
    min-width: 0;
    position: relative;
    padding-bottom: 40px;
}
.infosPrincipales {
    position: relative;
    margin-top: -30px;
    z-index: 1;
    margin-left: 16px;
    margin-right: 16px;
}
.colonneDroite {
    flex: 1;
    top: 80px;
}
.boutons{
    display:flex;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 10;
}
.like-button{
    margin-left: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.share-button{
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
@media (max-width: 768px) {
    .colonnes {
      flex-direction: column;
    }
    .colonneGauche {
      width: 100vw;
      padding-bottom: 0;
      order: 1;
    }
    .infosPrincipales {
      margin-top: 16px;
      margin-left: 0;
      margin-right: 0;
    }
    .colonneDroite {
      width: 100vw;
      order: 2;
      position: static;
    }
}
</style>