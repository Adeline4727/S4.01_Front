<script setup>
import {ref, computed, useTemplateRef, onMounted} from 'vue';
import DatePickerButton from '@/components/DatePickerButton.vue';
import ButtonVerifDispo from './ButtonVerifDispo.vue';
import DatePicker from '@/components/DatePicker.vue'
import { useRouter } from 'vue-router';

const props = defineProps({
    annonce: {
        required : true,
    },
})

import { useAnnoncesStore } from '@/stores/annonces';
const store = useAnnoncesStore();
const router = useRouter();

const showDatePicker = ref(false)
const dateArrivee = ref(null)
const dateDepart = ref(null)

const handleDatesSelected = ({ debut, fin }) => {
  dateArrivee.value = debut
  dateDepart.value = fin
  showDatePicker.value = false // On ferme la modale
}

const allerAReservation = () => {
  // Sécurité : On vérifie que les deux dates sont sélectionnées
  if (!dateArrivee.value || !dateDepart.value) {
    alert("Veuillez sélectionner vos dates d'arrivée et de départ.");
    return;
  }

  // Redirection vers la page de réservation
  router.push({
    name: 'reservation-annonce', 
    params: { id: props.annonce.id }, 
    // On passe les dates dans l'URL (ex: ?arrivee=2026-04-10&depart=2026-04-15)
    query: {
      arrivee: dateArrivee.value,
      depart: dateDepart.value
    }
  });
}
</script>

<template>
    <div class="rectangle">
        <p class="text">Sélectionnez vos dates de séjour :</p>
        <p id="info"><div class="entoure">i</div> <div id="textInfo">La prochaine date d'arrivée disponible est le {{  }}</div></p><!--A compléter-->
        <!--Parcourir les réservations + joursSemaine correspond aux jours disponible-->
        <div class="datePickers">
            <div class="text">
                Arrivée 
                <DatePickerButton :date="dateArrivee" @click="showDatePicker = true" />
            </div>
            <div class="text">
                Départ 
                <DatePickerButton :date="dateDepart" @click="showDatePicker = true" />
            </div>
        </div>
        <ButtonVerifDispo @click="allerAReservation"></ButtonVerifDispo>
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
    <div v-if="showDatePicker && store.annonce" class="modal-overlay" @click.self="showDatePicker = false">
        <div class="modal-content">
        <button class="close-modal-btn" @click="showDatePicker = false">&times;</button>
        
        <DatePicker 
            :annonce="store.annonce"
            @dates-validees="handleDatesSelected"
            @fermer="showDatePicker = false">
        </DatePicker>
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Noir transparent */
  display: flex;
  justify-content: center; /* Centre horizontalement */
  align-items: center;     /* Centre verticalement */
  z-index: 9999;           /* Au-dessus de tout le reste (notamment ton bandeau) */
}

/* Le conteneur spécifique du composant */
.modal-content {
  position: relative;
  /* L'animation d'apparition (optionnel mais plus joli) */
  animation: popIn 0.3s ease-out forwards;

  background-color: #ffffff; 
  border-radius: 16px;       /* Pour les bords arrondis */
  padding: 32px;             /* Pour donner de l'espace autour du calendrier */
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2); /* La petite ombre qui fait pro */
}

/* Le bouton pour fermer la modale */
.close-modal-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  z-index: 10;
  color: #222;
}

.close-modal-btn:hover {
  color: #ff5a5f;
}

/* Petite animation d'apparition douce */
@keyframes popIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.datePickers {
  display: flex;
  gap: 16px; /* Espace entre les deux boutons */
  margin: 20px 0;
}
.text {
  flex: 1; /* Pour que chaque bouton prenne 50% de la largeur */
  font-size: 14px;
  font-weight: bold;
}
</style>