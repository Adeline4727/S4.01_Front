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
<div class="rectangle">
<h1 class="titreAnnonce">{{ annonce.titreAnnonce }}</h1>
<h2>{{ annonce.typeHebergementBien.libelleTypeHebergement }} ⸱ {{ annonce.capacitePersonne }} personnes ⸱ {{ annonce.nbChambre }} chambres ⸱ {{ annonce.adresseBien.villeAdresse.nomVille }}</h2>
<h3>Min. {{ annonce.minmumNuite }} nuits, à partir de <h1 class="prix">{{ annonce.prix }}€ / nuit</h1></h3>
<ul>
    <li v-for="paiement in annonce.typesPaiement">
        {{ paiement.nom}}
    </li>
 </ul>
</div>
</template>

<style scoped>
*{
    margin: 0px;
    padding: 0px;
}
.rectangle{
    filter: drop-shadow(0 0 0.20rem gray);
    background-color: white;
    border-radius: 10px 10px 10px 0px;
    padding: 15px;
}
h2, h3{
    text-decoration: none;
    font-weight: 300;
    font-size: medium;
    padding-bottom: 15px;
}
h3{
    display: flex;
    align-items: center;
}
h1{
    font-size: larger;
}
.prix{
    margin-left: 7px;
}
.titreAnnonce{
    padding-top: 5px;
    padding-bottom: 10px;
}
ul{
    display: flex;
}
li{
    margin-left: 20px;
    list-style: none;
    background-color: aliceblue;
    border-radius: 20px;
    padding: 6px;
    font-size: small;
    font-weight: 700;
}
</style>