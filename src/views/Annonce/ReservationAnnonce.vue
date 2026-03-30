<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAnnoncesStore } from '@/stores/annonces'
import PanneauReservationAnnonce from '@/components/PanneauReservationAnnonce.vue'
import PanneauRecapPayementAnnonce from '@/components/PanneauRecapPayementAnnonce.vue'

const route = useRoute()
const store = useAnnoncesStore()

const dateArriveeChoisie = computed(() => route.query.arrivee)
const dateDepartChoisie = computed(() => route.query.depart)

const nbVoyageurs = ref(1)

onMounted(() => {
  store.getAnnonceById(route.params.id);
})

</script>

<template>
  <div v-if="store.annonce" id="conteneur">
    <PanneauReservationAnnonce
      v-model="nbVoyageurs"
      :annonce="store.annonce" 
      :dateArrivee="dateArriveeChoisie"
      :dateDepart="dateDepartChoisie"
      class="PanneauReservationAnnonce"
    />
    
    <PanneauRecapPayementAnnonce
      v-model="nbVoyageurs"
      :annonce="store.annonce" 
      :dateArrivee="dateArriveeChoisie"
      :dateDepart="dateDepartChoisie"
      class="PanneauRecapPayementAnnonce"
    />
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