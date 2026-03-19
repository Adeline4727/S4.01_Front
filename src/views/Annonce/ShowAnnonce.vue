<script setup>

import { ref, computed, useTemplateRef, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAnnoncesStore } from '@/stores/annonces'
import BandeauDispoAnnonce from '@/components/BandeauDispoAnnonce.vue'
import VerifDispoAnnonce from '@/components/VerifDispoAnnonce.vue'
import InfosPrincipalesAnnonce from '@/components/InfosPrincipalesAnnonce.vue'
import MapComponent from '@/components/MapComponent.vue';
import PhotosAnnonce from '@/components/PhotosAnnonce.vue';
import CarteInfoDetailsAnnonce from '@/components/CarteInfoDetailsAnnonce.vue';
import ButtonShare from '@/components/ButtonShare.vue';
import LikeButton from '@/components/LikeButton.vue';

const props = defineProps({
  annonce : {
    required : true,
  },
})

const route = useRoute()
const store = useAnnoncesStore()

const annonce = computed(() => store.getAnnonceById(route.params.id))

onMounted(() => {
    axios.get(url + "Annonces/GetAnnonce/" + route.params.id).then(response => {
        annonce.value = response.data
    })
})

</script>


<template>
  <div class="about">
    

    <BandeauDispoAnnonce></BandeauDispoAnnonce>
    <PhotosAnnonce></PhotosAnnonce>
    <VerifDispoAnnonce></VerifDispoAnnonce>
    <InfosPrincipalesAnnonce :annonce="annonce"></InfosPrincipalesAnnonce>
    <CarteInfoDetailsAnnonce></CarteInfoDetailsAnnonce>
    <ButtonShare></ButtonShare>
    <LikeButton></LikeButton>
    <MapComponent latitude="" longitude=""></MapComponent>

  </div>
</template>

<style>

</style>
