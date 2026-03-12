<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import AnnonceLite from '@/components/AnnonceLite.vue';
import SearchFieldWithIcon from '@/components/SearchFieldWithIcon.vue';
import ActionDropdownWithIcon from '@/components/ActionDropdownWithIcon.vue';

</script>


<template>
    <div id="recherche">
        <div class="search-zone">
            <SearchFieldWithIcon placeholder="Choisir une destination" icon="location-outline" hasChevron="true" />
            <ActionDropdownWithIcon icon="calendar-outline" label="Dates" hasChevron v-model:isActive="ddActive">
                <div class="field">
                    <label for="arrival">Arrivée</label>
                    <input type="date" name="arrival">
                </div>
                <span>au</span>
                <div class="field">
                    <label for="departure">Départ</label>
                    <input type="date" name="departure">
                </div>
            </ActionDropdownWithIcon>
            <ActionDropdownWithIcon icon="people-outline" label="Voyageurs" hasChevron v-model:isActive="ddActive">
                <button>-</button>
                <input type="number" name="" id="">
                <button>+</button>
            </ActionDropdownWithIcon>
        </div>
        <h2>Annonces : Toute la France</h2>
        <b>4 annonces</b>
        <AnnonceLite title="Annonce" category="Test" capacity="8" price="42,00" city="74940 Annecy" publishDate="03/14/1592 6:53" />
        <AnnonceLite title="Annonce" category="Test" capacity="12" price="42,00" city="74940 Annecy" publishDate="03/14/1592 6:53" isNew="true" />
        <AnnonceLite title="Annonce" category="Test" capacity="4" price="42,00" city="74940 Annecy" publishDate="03/14/1592 6:53" isPro="true" />
        <AnnonceLite title="Annonce" category="Test" capacity="2" price="42,00" city="74940 Annecy" publishDate="03/14/1592 6:53" isNew="true" isPro="true"  />
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
    }
</style>
