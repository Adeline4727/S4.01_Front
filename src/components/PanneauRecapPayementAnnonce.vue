<script setup>
import { ref, computed, onMounted } from 'vue'
import AnnonceCard from './AnnonceCard.vue';
const props = defineProps({
    nbVoyageurs :{
        type: Number,
        default: 1
    },
    doesNameAppear: {
        type: String,
        required: false,
        default: "no"
    },
    annonce : {
        required : true,
    },
    name: {
        type: String,
        required: false,
        default: localStorage.getItem('name')
    },
    dateArrivee: {
        type: String,
        default: null
    },
    dateDepart: {
        type: String,
        default: null
    }
    
})

const nombreNuits = computed(() => {
    if (!props.dateArrivee || !props.dateDepart) return 0;
    
    const debut = new Date(props.dateArrivee);
    const fin = new Date(props.dateDepart);
    
    // On calcule la différence en millisecondes, puis on convertit en jours
    const diffTime = Math.abs(fin - debut);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
})

const Montantdelalocation = computed(() =>{
    const prix = props.annonce.prix
    return nombreNuits.value*prix
})

const Fraisdeservice = computed(() =>{
    const tauxService = 0.15; 
    return Math.round(Montantdelalocation.value * tauxService * 100) / 100;
})

const Taxedeséjour = computed(() =>{
    const tarifParNuitParPersonne = 2.0;
    return props.nbVoyageurs * tarifParNuitParPersonne * nombreNuits.value
})

const Total = computed(() => {
    return Montantdelalocation.value + Fraisdeservice.value + Taxedeséjour.value;
})

const aPayerMaintenant = computed(() => {
    return (Montantdelalocation.value * 0.3) + Fraisdeservice.value + Taxedeséjour.value;
})

const resteSurPlace = computed(() => {
    return Total.value - aPayerMaintenant.value;
})

</script>

<template>
    <div class="PanneauRecapPayementAnnonce">
        <div>
            <div>
                <img class="image" :src="'/'+annonce.photos?.[0]?.lienurl" alt="[imagesAnnonce]">
            </div>
            <div>
                <h2>{{ annonce.titreAnnonce }}</h2>
                <p>{{ annonce.capacitePersonne }} personnes / {{ annonce.nbChambre }} chambres</p>
                <p>{{ annonce.adresseBien.villeAdresse.nomVille }}</p>
            </div>
        </div>
        <div class="trait"></div>
        <div>
            <div class="infoProfil">
                <img class="imageProfil" :src="'/'+annonce.proprietaireBien.photoProfil?.lienurl" alt="[imageProprietaire]">
                <div class="text-body-1 font-bold" v-if="doesNameAppear !== 'no'">{{ name }}</div>
            </div>
        </div>
        <div class="trait"></div>
        <div>
            <h2>Récapitulatif du paiement</h2>
            <div>
                <div>
                    <p>Montant de la location</p>
                    <p>{{ Montantdelalocation }}</p>
                </div>
                <div>
                    <p>Frais de service</p>
                    <p>{{ Fraisdeservice }}</p>
                </div>
                <div>
                    <p>Taxe de séjour</p>
                    <p>{{ Taxedeséjour }}</p>
                </div>
            </div>
        </div>
        <div class="trait"></div>
        <div>
            <div>
                <div>
                    <p>Total</p>
                    <p>{{ Total }}</p>
                </div>
                <div>
                    <p>À payer maintenant</p>
                    <p>{{ aPayerMaintenant }}</p>
                </div>
                <div>
                    <p>Restera à payer sur place</p>
                    <p>{{ resteSurPlace }}</p>
                </div>
            </div>
            <p class="commentaire">Ce paiement nous sert à garantir votre réservation. Il inclut un acompte pour la location, les frais de service et la taxe de séjour. Retrouvez le détail de nos conditions d’annulation ici</p>
        </div>
    </div>
</template>

<style scoped>
.PanneauRecapPayementAnnonce{
    display: flex;
    flex-direction: column;
}
.trait{
    height: 1px;
    margin-top: 20px;
    margin-bottom: 20px;
    border: solid 1px gray;
}
.commentaire{
    color: gray;
    font-style: italic;
    font-size: 15px;
}
.image{
    width: 200px;
}
.imageProfil{
    border-radius: 50%;
    width: 100px;
}
.infoProfil{
    display: flex;
    gap: 1rem;
    align-items: center;
}
</style>