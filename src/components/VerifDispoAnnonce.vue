<script setup>
import {ref, computed, useTemplateRef, onMounted} from 'vue';
import DatePicker from '@/components/DatePicker.vue';

const props = defineProps({
    annonce: {
        required : true,
    },
})

</script>

<template>
<div class="rectangle">
<p class="text">Sélectionnez vos dates de séjour :</p>
<p id="info"><div class="entoure">i</div> <div id="textInfo">La prochaine date d'arrivée disponible est le {{  }}</div></p><!--A compléter-->
<!--Parcourir les réservations + joursSemaine correspond aux jours disponible-->
<div class="datePickers">
    <div class="text"> Arrivée <DatePicker/></div>
    <div class="text"> Départ <DatePicker/></div>
</div>
<div class="trait"></div>
<!-- <img src={{ annonce.proprietaireBien.photoProfil.lienurl }} alt=""> -->
<!-- <h1>{{ annonce.proprietaireBien.compteUtilisateurAssocie.prenom }}</h1>Ajouter pseudo utilisateur -->
</div>
</template>

<style scoped>
*{
    margin: 0;
    padding: 0;
    
}

.rectangle{
    filter: drop-shadow(0 0 0.20rem gray);
    background-color: white;
    border-radius: 10px;
}

.entoure{
    border: solid 1px black;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    display: flex;  
    align-items: center;
    justify-content: center;
}

#info{
    display: flex;
    align-items: center;
    background-color: #ffffe1;
    border-radius: 10px;
    padding: 20px;
    margin-left: 20px;
    margin-right: 20px;
}
#textInfo{
    margin-left: 20px;
}
.text{
    padding: 20px;
}
#datePickers{
    display: flex;
}
.trait{
    height: 1px;
    margin: 20px;
    border: solid 2px gray;
}
</style>