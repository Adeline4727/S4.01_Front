<script setup>

import { ref, computed, useTemplateRef, onMounted } from 'vue'
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
    <InfosPrincipalesAnnonce></InfosPrincipalesAnnonce>
    <CarteInfoDetailsAnnonce></CarteInfoDetailsAnnonce>
    <ButtonShare></ButtonShare>
    <LikeButton></LikeButton>
    <MapComponent></MapComponent>

  </div>
</template>

<style>

</style>
