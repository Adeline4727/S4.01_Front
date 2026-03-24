<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAnnoncesStore } from '@/stores/annonces'
import BandeauResevationAnnonce from '@/components/BandeauResevationAnnonce'
import BandeauRecapPayementAnnonce from '@/components/BandeauRecapPayementAnnonce'


const route = useRoute()
const store = useAnnoncesStore()
onMounted(() => {
    store.getAnnonceById(route.params.id);
})
</script>
<p>o</p>
<template>
  <div v-if="store.annonce">
    <BandeauResevationAnnonce :annonce="store.annonce"/>
    <BandeauRecapPayementAnnonce :annonce="store.annonce"/>
  </div>
  <div v-else>Chargement...</div>
</template>

<style scoped>

</style>