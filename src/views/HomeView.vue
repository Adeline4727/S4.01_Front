<script setup>
import { ref } from 'vue'
import AnnonceCard from '@/components/AnnonceCard.vue';
import ButtonWithIcon from '@/components/ButtonWithIcon.vue';
import Carrousel from '@/components/Carrousel.vue';
import axios from 'axios'
const url = "https://leboncoinapi-b0b2bmazh9ebdqef.switzerlandnorth-01.azurewebsites.net/api/"
const annonces = ref([])
axios.get(url+"Annonces/GetAnnonces").then( response => {
    annonces.value = response.data
})
</script>

<template>
    <div class="deposAnnonceElement">
        <h1>C'est le moment de vendre !</h1>
        <RouterLink to="/DeposAnnonce">
            <ButtonWithIcon icon="add-circle-outline"><b>Déposer une annonce</b></ButtonWithIcon>
        </RouterLink>
    </div>

    <section>
        <h2>En ce moment sur Leboncoin</h2>
        <article>
            <h3>Ventes immobilières</h3>
            <Carrousel>
                <AnnonceCard v-for="annonce in annonces" :title="annonce.titreAnnonce" :category="annonce.TypeHebergement" :capacity="annonce.CapacitePersonne" :owner="annonce.compteUtilisateur" :price="annonce.prix" :city="annonce.Adresse" :publishDate="annonce.Date" />
            </Carrousel>
        </article>
    </section>
</template>


<style scoped>
    *{
        margin: 0;
        text-decoration: none;
    }
    .deposAnnonceElement{
        border-radius: 15px;
        width: 75%;
        padding: 10px;
        margin: 0 auto;
        margin-top: 50px;
        margin-bottom: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        
        background-image: url("public/background2.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
</style>
