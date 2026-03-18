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

<p>Sélectionnez vos dates de séjour :</p>
<p><div class="entoure">i</div> La prochaine date d'arrvée disponible est le {{  }}</p><!--A compléter-->
<div>
    <div> Arrivée <DatePicker/></div>
    <div> Départ <DatePicker/></div>
</div>
<div class="trait"></div>
<!-- <img src={{ annonce.proprietaireBien.photoProfil.lienurl }} alt=""> -->
<!-- <h1>{{ annonce.proprietaireBien.compteUtilisateurAssocie.prenom }}</h1>Ajouter pseudo utilisateur -->
</template>