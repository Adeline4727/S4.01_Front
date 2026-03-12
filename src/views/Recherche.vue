<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import AnnonceLite from '@/components/AnnonceLite.vue';
</script>


<template>
    <div id="recherche">
        <AnnonceLite title="Annonce" price="42,00" category="Test" city="74940 Annecy" />
        <AnnonceLite title="Annonce" price="42,00" category="Test" city="74940 Annecy" isNew="true" />
        <!-- <AnnonceLite title="Annonce" price="42,00" category="Test" city="74940 Annecy" publishDate="03/14/1592 6:53" isPro="true" /> -->
        <AnnonceLite title="Annonce" price="42,00" category="Test" city="74940 Annecy" isNew="true" isPro="true"  />
    </div>
</template>

<style>
    #recherche {
        margin: 4rem 15%;
        display: flex;
        gap: 1.5rem;
        flex-direction: column;
    }
</style>
