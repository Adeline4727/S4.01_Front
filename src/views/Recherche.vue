<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAnnoncesStore } from '@/stores/annonces'

import AnnonceLite from '@/components/AnnonceLite.vue'
import SearchFieldWithIcon from '@/components/SearchFieldWithIcon.vue'
import ActionDropdownWithIcon from '@/components/ActionDropdownWithIcon.vue'
import MapComponent from '@/components/MapComponent.vue'

const store = useAnnoncesStore()
const route = useRoute()
const filter = ref(route.params.filter || '')
const ddActive = ref(false)

onMounted(() => {
  console.log(filter)
    // store.fetchAnnonces()
  if(filter.value === '' || !filter.value) {
    console.log("all annonces")
    store.fetchAnnonces()
  }
  else {
    console.log("filter")
    store.getAnnoncesWithFilter(filter.value.toLowerCase())
  }
})

// const filteredAnnonces = computed(() => {
//
// })

const mapMarkers = computed(() => {
    return store.annonces
        .map(annonce => ({
            id: annonce.annonceId,
            titre: annonce.titreAnnonce,
            latitude: annonce.adresseBien?.latitude,
            longitude: annonce.adresseBien?.longitude 
        }))
        .filter(marker => marker.latitude && marker.longitude)
})
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
                <p>OwO</p>
                <p>x)</p>
            </ActionDropdownWithIcon>
        </div>
        <section>
            <article class="annonces">
                <div>
                    <h2>{{ filter ? 'Annonces pour "' + filter + '"' : "Toutes les annonces"}}</h2>
                    <b>{{ store.annonces.length }} annonce{{ store.annonces.length > 1 ? "s" : "" }}</b>
                </div>
                <div class="list-annonces">
                    <AnnonceLite 
                        v-for="annonce in store.annonces"
                        :key="annonce.annonceId"
                        :title="annonce.titreAnnonce"
                        :image="'/' + annonce.photos?.[0]?.lienurl"
                        :category="annonce.typeHebergementBien?.libelleTypeHebergement" 
                        :capacity="annonce.capacitePersonne" 
                        :price="annonce.prix" 
                        :city="annonce.adresseBien?.villeAdresse?.nomVille" 
                        :publishDate="annonce.datePublication?.valeur"
                        :redirection="{ name: 'ShowAnnonce', params: { id: annonce.annonceId} }"
                    />
                </div>
            </article>
            <article class="map">
                <MapComponent :markers="mapMarkers"></MapComponent>
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