<script setup>
import {ref, computed, useTemplateRef, onMounted} from 'vue';
import DatePicker from '@/components/DatePicker.vue';
import ButtonVerifDispo from './ButtonVerifDispo.vue';

const props = defineProps({
    annonce: {
        required : true,
    },
})

import { useAnnoncesStore } from '@/stores/annonces';
const store = useAnnoncesStore();

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
        <ButtonVerifDispo></ButtonVerifDispo>
        <div class="trait"></div>
        <div class="carteProprio">
            <img 
            v-if="annonce.proprietaireBien?.photoProfil?.lienurl" 
            :src="annonce.proprietaireBien?.photoProfil?.lienurl" 
            alt="Photo de profil du propriétaire"
            >
            <div v-else>
                <div class="avatarLettre" v-if="annonce.proprietaireBien?.particulierAssocie?.prenom">{{ annonce.proprietaireBien?.particulierAssocie?.prenom?.charAt(0).toUpperCase() }}</div>
                <div class="avatarLettre" v-else-if="annonce.proprietaireBien?.professionnelAssocie?.nomProfessionnel">{{ annonce.proprietaireBien?.professionnelAssocie?.nomProfessionnel?.charAt(0).toUpperCase() }}</div>
                <div class="avatarLettre" v-else>A</div>
            </div>
            <h1 v-if="annonce.proprietaireBien?.particulierAssocie?.prenom"  class="nomProprio">{{ annonce.proprietaireBien.particulierAssocie.prenom }}</h1>
            <h1 v-else-if="annonce.proprietaireBien?.professionnelAssocie?.nomProfessionnel"  class="nomProprio">{{ annonce.proprietaireBien.professionnelAssocie.nomProfessionnel }}</h1>
            <h1 v-else class="nomProprio">Anonyme</h1>
            <!--Ajouter clic sur le profil-->
        </div>
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
.datePickers{
    display: flex;
}
.trait{
    height: 1px;
    margin: 20px;
    border: solid 1px gray;
}
.carteProprio{
    display: flex;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
}
.avatarLettre{
    display: flex;
    background-color: blueviolet;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size:xx-large;
    width: 80px;
    height: 80px;
    border-radius: 50%;
}
.nomProprio{
    margin-left: 30px;
}
</style>