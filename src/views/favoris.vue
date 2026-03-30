<script setup>

import {useUserStore} from "@/stores/user.js";

const store = useUserStore()
</script>

<template>
    <section class="homeCarrousel">
            <h2>En ce moment sur Leboncoin</h2>
            <article>
                <h3>Ventes immobilières</h3>
                <Carrousel>
                    <RouterLink v-for="annonce in store.getUserInfos().annoncesFavorisees" :to="{ name: 'ShowAnnonce', params: { id: annonce.annonceId} }" >
                        <AnnonceCard class="Card" v-if="annonce.proprietaireBien?.particulierAssocie" :image="annonce.photos?.[0]?.lienurl" :title="annonce.titreAnnonce" :category="annonce.TypeHebergement" :capacity="annonce.CapacitePersonne" :owner="annonce.proprietaireBien?.particulierAssocie?.nom" :price="annonce.prix" :city="annonce.Adresse" :publishDate="annonce.Date" />                    
                        <AnnonceCard class="Card" v-else-if="annonce.proprietaireBien?.professionnelAssocie" :image="annonce.photos?.[0]?.lienurl" :title="annonce.titreAnnonce" :category="annonce.TypeHebergement" :capacity="annonce.CapacitePersonne" :owner="annonce.proprietaireBien?.professionnelAssocie?.nomProfessionnel" :price="annonce.prix" :city="annonce.Adresse" :publishDate="annonce.Date" />
                    </RouterLink>
                </Carrousel>
            </article>
        </section>
    </template>
<style scoped>
</style>