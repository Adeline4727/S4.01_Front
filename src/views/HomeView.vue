<script setup>
import { computed, onMounted, ref } from 'vue' // <-- Ajout de 'ref' ici
import AnnonceCard from '@/components/AnnonceCard.vue';
import Carrousel from '@/components/Carrousel.vue';
import { useAnnoncesStore } from '@/stores/annonces'
import Button from "@/components/Button.vue";

const store = useAnnoncesStore()

// Variable qui stocke la limite d'affichage (6 par défaut)
const limiteAffichage = ref(6)

onMounted(() => {
    store.fetchAnnonces()
})

// 1. On filtre TOUTES les annonces valides (sans les couper)
const toutesAnnoncesValides = computed(() => {
    return store.annonces.filter(a => 
        a.proprietaireBien?.particulierAssocie || 
        a.proprietaireBien?.professionnelAssocie
    )
})

// 2. On coupe la liste en fonction de notre limite actuelle
const annoncesAffichees = computed(() => {
    return toutesAnnoncesValides.value.slice(0, limiteAffichage.value)
})

// 3. On vérifie s'il reste des annonces à afficher pour savoir si on montre le bouton
const resteDesAnnonces = computed(() => {
    return limiteAffichage.value < toutesAnnoncesValides.value.length
})

// 4. Fonction déclenchée au clic sur le bouton "Voir plus"
const chargerPlus = () => {
    limiteAffichage.value += 6
}

const getOwnerName = (annonce) => {
    return annonce.proprietaireBien?.particulierAssocie?.nom || 
           annonce.proprietaireBien?.professionnelAssocie?.nomProfessionnel || 
           'Anonyme'
}
</script>

<template>
    <div class="deposAnnonceElement">
        <h1>C'est le moment de vendre !</h1>
        <RouterLink to="/annonces/deposer">
            <Button icon="add-circle-outline" :button-width="250"><b>Déposer une annonce</b></Button>
        </RouterLink>
    </div>

    <section class="homeCarrousel">
        <h2>En ce moment sur Leboncoin</h2>
        <article>
            <h3>Ventes immobilières</h3>
            <Carrousel>
                <div v-for="annonce in annoncesAffichees" :key="annonce.annonceId">
                    <AnnonceCard 
                        class="Card" 
                        :redirection="{ name: 'ShowAnnonce', params: { id: annonce.annonceId} }" 
                        :image="annonce.photos?.[0]?.lienurl" 
                        :title="annonce.titreAnnonce" 
                        :category="annonce.TypeHebergement"
                        :capacity="annonce.CapacitePersonne" 
                        :owner="getOwnerName(annonce)" 
                        :price="annonce.prix" 
                        :city="annonce.Adresse" 
                        :publishDate="annonce.Date" 
                    />
                </div>
                
                <div v-if="resteDesAnnonces" class="bouton-voir-plus-container">
                    <button class="bouton-voir-plus" @click="chargerPlus">
                        Voir plus d'annonces
                    </button>
                </div>
            </Carrousel>
        </article>
    </section>
</template>

<style scoped>
    .homeCarrousel { margin: 20px; }
    .deposAnnonceElement {
        border-radius: 15px;
        width: 75%;
        padding: 10px;
        margin: 50px auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        background-image: url("/background2.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    .Card { margin: 0 15px; }

    /* Styles pour le bouton "Voir plus" à la fin du carrousel */
    .bouton-voir-plus-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 250px; /* Prend la même largeur qu'une carte annonce environ */
        margin: 0 15px;
    }

    .bouton-voir-plus {
        padding: 12px 24px;
        background-color: #ec5a13;
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    .bouton-voir-plus:hover {
        background-color: #d44a0e;
    }
</style>