<script setup>
import {ref, computed, useTemplateRef, onMounted} from 'vue';
import ButtonVerifDispo from './ButtonVerifDispo.vue';
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
    <div>
        <h1 class="titreAnnonce">{{ annonce.titreAnnonce }}</h1>
        <h3>Min. {{ annonce.minmumNuite }} nuits, à partir de <h1 class="prix">{{ annonce.prix }}€ / nuit</h1></h3>
    </div>
    <ButtonVerifDispo></ButtonVerifDispo>
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
    padding: 15px;
    display: flex;
    align-items: center;
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
    font-size:medium;
}
.prix{
    margin-left: 7px;
}
.titreAnnonce{
    padding-top: 5px;
    padding-bottom: 10px;
}
</style>