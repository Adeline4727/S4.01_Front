<script setup>
import BouttonAjtAnnonce from './BouttonAjtAnnonce.vue';
const emit = defineEmits(['click']);
</script>
<template>
    <BouttonAjtAnnonce class="button" @click="emit('click')">Vérifier la disponibilité</BouttonAjtAnnonce>
</template>
<style scoped>
.button{
    padding: 10px;
    font-weight: 700;
}
</style>