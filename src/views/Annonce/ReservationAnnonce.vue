<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAnnoncesStore } from '@/stores/annonces'
import PanneauReservationAnnonce from '@/components/PanneauReservationAnnonce.vue'
import PanneauRecapPayementAnnonce from '@/components/PanneauRecapPayementAnnonce.vue'

const route = useRoute()
const store = useAnnoncesStore()

onMounted(() => {
  store.getAnnonceById(route.params.id);
})

</script>

<template>
  <div v-if="store.annonce" id="conteneur">
    <PanneauReservationAnnonce :annonce="store.annonce" class="PanneauReservationAnnonce"/>
    <PanneauRecapPayementAnnonce :annonce="store.annonce" class="PanneauRecapPayementAnnonce"/>
  </div>
  <div v-else>Chargement...</div>
</template>

<style scoped>
  #conteneur{
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    justify-content: center;
  }
  .PanneauReservationAnnonce{
    width: 800px;
  }
  .PanneauRecapPayementAnnonce{
    width: 600px;
  }
</style>