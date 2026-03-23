<script setup>
import { ref, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import AnnonceLite from '@/components/AnnonceLite.vue';
import SearchFieldWithIcon from '@/components/SearchFieldWithIcon.vue';
import ActionDropdownWithIcon from '@/components/ActionDropdownWithIcon.vue';
import MapComponent from '@/components/MapComponent.vue';
import axios  from 'axios';
import { useRoute } from 'vue-router';
import { useAnnoncesStore } from '@/stores/annonces';
import { onMounted } from 'vue';

const store = useAnnoncesStore()
const route = useRoute();
const villeRecherchee = ref('');
villeRecherchee.value = route.params.ville; // ville car :ville dans la route
const annonces = ref([])
onMounted(() => {
    store.fetchAnnonces()
})
const filteredProducts = () => {
      
      return store.annonces.filter(item => {
        const nomDeLaVille = villeRecherchee.value
        const recherche = nomDeLaVille.toLowerCase();
        const villeDeLAnnonce = item.adresseBien.villeAdresse.nomVille.toLowerCase();
        const matchTexte = villeDeLAnnonce.includes(recherche);
        //const matchPrix = item.price <= parseFloat(this.max) && item.price >= parseFloat(this.min);
        
        return matchTexte /*&& matchPrix*/;
    });
    }
    const mapMarkers = computed(() => {
    return filteredProducts().map(annonce => {
        return {
            id: annonce.annonceId,
            titre: annonce.titreAnnonce,
            // ⚠️ Assure-toi que ces noms correspondent exactement à ton JSON de retour d'API (ton C#)
            latitude: annonce.adresseBien?.latitude, 
            longitude: annonce.adresseBien?.longitude 
        }
    }).filter(marker => marker.latitude && marker.longitude); // On exclut les annonces sans coordonnées
});


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
                    <h2>Annonces Pour {{ villeRecherchee }}</h2>
                    <b>{{store.annonces?.length || 0}} annonce{{store.annonces?.length > 1 ? "s" : ""}}</b>
                </div>
                <div class="list-annonces">
                    <AnnonceLite v-for="annonce in filteredProducts()" :title="annonce.titreAnnonce" :category="annonce.typeHebergementBien.libelleTypeHebergement" :capacity="annonce.capacitePersonne" :price="annonce.prix" :city="annonce.adresseBien.villeAdresse.nomVille" :publishDate="annonce.datePublication.valeur" />
                </div>
                <!-- <div>{{ store.annonces }}</div> -->
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
