<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAnnoncesStore } from '@/stores/annonces'
import PanneauFinalisationPaiement from '@/components/PanneauFinalisationPaiement.vue'

const route = useRoute()
const store = useAnnoncesStore()

onMounted(() => {
  store.getAnnonceById(route.params.id);
})

</script>

<template>
    <div v-if="store.annonce" id="conteneur">
      <PanneauFinalisationPaiement :annonce="store.annonce" class="PanneauFinalisationPaiement"/>
    </div>
    <div v-else>Chargement...</div>
</template>


<style scoped>

</style>