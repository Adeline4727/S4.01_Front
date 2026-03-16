<script setup>
import {ref, computed, useTemplateRef, onMounted} from 'vue';

const props = defineProps({
    annonce : {
        required : true,
    }
})

import { useAnnoncesStore } from '@/stores/annonces';
const store = useAnnoncesStore();

</script>

<template>

<h1>{{ annonce.titreAnnonce }}</h1>
<h2>{{ annonce.typeHebergementBien.libelleTypeHebergement }} ⸱ {{ annonce.capacitePersonne }} personnes ⸱ {{ annonce.nbChambre }} chambres ⸱ {{ annonce.adresseBien.villeAdresse.nomVille }}</h2>
<h3>Min. {{  }} nuits, à partir de <h1>{{ annonce.prixPeriodes[0].prix }}€ / nuit</h1></h3>
<!-- modif prix min pour le calculer et ajouter minimum de nuits-->
 <ul>
    <li v-for="paiement in annonce."><!--Ajouter typesPaiement-->
        {{ paiement.nomPaiement }}<<!--Vérifier ça-->
    </li>
 </ul>

</template>

<style scoped>

</style>