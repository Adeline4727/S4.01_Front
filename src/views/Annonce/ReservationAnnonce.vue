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
  <p>test</p>
  <div v-if="store.annonce">
    <PanneauResevationAnnonce :annonce="store.annonce"/>
    <PanneauRecapPayementAnnonce :annonce="store.annonce"/>
  </div>
  <div v-else>Chargement...</div>
</template>

<style scoped>

</style>