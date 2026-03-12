<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import AnnonceLite from '@/components/AnnonceLite.vue';
import SearchFieldWithIcon from '@/components/SearchFieldWithIcon.vue';
import ActionDropdownWithIcon from '@/components/ActionDropdownWithIcon.vue';

const ddActive = ref(false); 
</script>


<template>
    <div id="recherche">
        <div class="search-zone">
            <SearchFieldWithIcon placeholder="Choisir une localisation" icon="location-outline" />
            <ActionDropdownWithIcon label="Prix" icon="logo-euro" v-model:isActive="ddActive">
                <div>
                    <label>Prix minimum</label>
                    <SearchFieldWithIcon placeholder="Prix minimum" icon="logo-euro" />
                </div>
                <div>
                    <label>Prix maximum</label>
                    <SearchFieldWithIcon placeholder="Prix maximum" icon="logo-euro" />
                </div>
            </ActionDropdownWithIcon>
        </div>
        <h2>Annonces : Toute la France</h2>
        <b>4 annonces</b>
        <AnnonceLite title="Annonce" price="42,00" category="Test" city="74940 Annecy" publishDate="03/14/1592 6:53" />
        <AnnonceLite title="Annonce" price="42,00" category="Test" city="74940 Annecy" publishDate="03/14/1592 6:53" isNew="true" />
        <AnnonceLite title="Annonce" price="42,00" category="Test" city="74940 Annecy" publishDate="03/14/1592 6:53" isPro="true" />
        <AnnonceLite title="Annonce" price="42,00" category="Test" city="74940 Annecy" publishDate="03/14/1592 6:53" isNew="true" isPro="true"  />
    </div>
</template>

<style>
    #recherche {
        margin: 4rem 15%;
        display: flex;
        gap: 1.5rem;
        flex-direction: column;
    }

    #recherche .search-zone {
        display: flex;
        gap: 1rem;
    }
</style>
