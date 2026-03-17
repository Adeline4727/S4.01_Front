<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import AnnonceLite from '@/components/AnnonceLite.vue';
import SearchFieldWithIcon from '@/components/SearchFieldWithIcon.vue';
import ActionDropdownWithIcon from '@/components/ActionDropdownWithIcon.vue';
import MapComponent from '@/components/MapComponent.vue';
// import axios  from 'axios';

// const apparttrier = ref()
// axios.get("https://leboncoinapi-b0b2bmazh9ebdqef.switzerlandnorth-01.azurewebsites.net").then(reponse => {
//     apparttrier.value = reponse.data})


</script>


<template>
    <div id="recherche">
        <div class="search-zone">
            <SearchFieldWithIcon placeholder="Choisir une destination" icon="location-outline" hasChevron="true" />
            <ActionDropdownWithIcon icon="calendar-outline" label="Dates" hasChevron v-model:isActive="ddActive">
                <div class="field">
                    <label for="arrival">Arrivée</label>
                    <input type="date" id="arrival">
                </div>
                <span>au</span>
                <div class="field">
                    <label for="departure">Départ</label>
                    <input type="date" id="departure">
                </div>
            </ActionDropdownWithIcon>
            <ActionDropdownWithIcon icon="people-outline" label="Voyageurs" hasChevron v-model:isActive="ddActive">
                <button>-</button>
                <input type="number" id="">
                <button>+</button>
            </ActionDropdownWithIcon>
            <ActionDropdownWithIcon icon="card-outline" label="Paiement en ligne" hasChevron v-model:isActive="ddActive">
                <input type="checkbox" id="paiement-en-ligne">
                <label for="paiement-en-ligne">Paiement en ligne</label>
            </ActionDropdownWithIcon>
            <ActionDropdownWithIcon icon="menu" label="Filtres" hasChevron v-model:isActive="ddActive">
                <p>UwU</p>
            </ActionDropdownWithIcon>
        </div>
        <section>
            <article class="annonces">
                <div>
                    <h2>Annonces : Toute la France</h2>
                    <b>8 annonces</b>
                </div>
                <div class="list-annonces">
                    <AnnonceLite title="Annonce" category="Test" capacity="8" price="42,00" city="74940 Annecy" publishDate="03/14/1592 6:53" />
                    <AnnonceLite title="Annonce" category="Test" capacity="12" price="42,00" city="74940 Annecy" publishDate="03/14/1592 6:53" isNew="true" />
                    <AnnonceLite title="Annonce" category="Test" capacity="4" price="42,00" city="74940 Annecy" publishDate="03/14/1592 6:53" isPro="true" />
                    <AnnonceLite title="Annonce" category="Test" capacity="2" price="42,00" city="74940 Annecy" publishDate="03/14/1592 6:53" isNew="true" isPro="true"  />
                    <AnnonceLite title="Annonce" category="Test" capacity="8" price="42,00" city="74940 Annecy" publishDate="03/14/1592 6:53" />
                    <AnnonceLite title="Annonce" category="Test" capacity="12" price="42,00" city="74940 Annecy" publishDate="03/14/1592 6:53" isNew="true" />
                    <AnnonceLite title="Annonce" category="Test" capacity="4" price="42,00" city="74940 Annecy" publishDate="03/14/1592 6:53" isPro="true" />
                    <AnnonceLite title="Annonce" category="Test" capacity="2" price="42,00" city="74940 Annecy" publishDate="03/14/1592 6:53" isNew="true" isPro="true"  />
                </div>
            </article>
            <article class="map">
                <MapComponent />
            </article>
        </section>
        </div>
</template>

<style scoped>
    #recherche {
        margin: 4rem 10%;
        position: relative;
    }

    #recherche .search-zone {
        display: flex;
        gap: 0.75rem;
    }

    #recherche > section {
        display: flex;
        align-items: start;
        justify-content: space-between;
    }

    #recherche .annonces > h3 {
        margin: 0;
        padding: 0;
    }

    #recherche .list-annonces {
        display: flex;
        gap: 1.5rem;
        flex-direction: column;
        padding: 1.5rem 0;
    }

    #recherche article.map {
        width: 48%;
        margin-top: 1.5rem;
        position: sticky;
        top: 2rem;
        height: calc(100vh - 4rem);
    }
</style>
