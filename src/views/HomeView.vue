<script setup>
import { ref, onMounted } from 'vue'
import AnnonceCard from '@/components/AnnonceCard.vue';
import Carrousel from '@/components/Carrousel.vue';
import axios from 'axios';
import { useAnnoncesStore } from '@/stores/annonces'
import Button from "@/components/Button.vue";
const store = useAnnoncesStore()
onMounted(() => {
    store.fetchAnnonces()
})
</script>

<template>
    <div class="deposAnnonceElement">
        <h1>C'est le moment de vendre !</h1>
        <RouterLink to="/DeposAnnonce">
            <Button icon="add-circle-outline" button-width="250"><b>Déposer une annonce</b></Button>
        </RouterLink>
    </div>

    <section class="homeCarrousel">
        <h2>En ce moment sur Leboncoin</h2>
        <article>
            <h3>Ventes immobilières</h3>
            <Carrousel>
                <RouterLink v-for="annonce in store.annonces" :to="{ name: 'ShowAnnonce', params: { id: annonce.annonceId} }" >
                    <AnnonceCard class="Card" v-if="annonce.proprietaireBien?.particulierAssocie" :image="annonce.photos?.[0]?.lienurl" :title="annonce.titreAnnonce" :category="annonce.TypeHebergement" :capacity="annonce.CapacitePersonne" :owner="annonce.proprietaireBien?.particulierAssocie?.nom" :price="annonce.prix" :city="annonce.Adresse" :publishDate="annonce.Date" />                    
                    <AnnonceCard class="Card" v-else-if="annonce.proprietaireBien?.professionnelAssocie" :image="annonce.photos?.[0]?.lienurl" :title="annonce.titreAnnonce" :category="annonce.TypeHebergement" :capacity="annonce.CapacitePersonne" :owner="annonce.proprietaireBien?.professionnelAssocie?.nomProfessionnel" :price="annonce.prix" :city="annonce.Adresse" :publishDate="annonce.Date" />
                </RouterLink>
            </Carrousel>
        </article>
    </section>
</template>


<style scoped>
    *{
        margin: 0;
        text-decoration: none;
    }
    .homeCarrousel{
        margin: 20px;
    }
    .deposAnnonceElement{
        border-radius: 15px;
        width: 75%;
        padding: 10px;
        margin: 50px auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        
        background-image: url("public/background2.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    .Card{
        margin-left: 15px;
        margin-right: 15px;
    }
</style>
