<script setup>
import {ref,computed } from 'vue'

// 1. On déclare la prop qui reçoit l'objet annonce
const props = defineProps({
  annonce: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

// 2. On récupère le prix directement depuis l'annonce
const prixParNuit = computed(() => props.annonce?.prix || 0)

// 3. On calcule toutes les dates réservées
const datesReservees = computed(() => {
  const joursOccupes = new Set() // Un Set évite les doublons
  const reservations = props.annonce?.reservations || []

  reservations.forEach(resa => {
    // Il faut s'assurer que debutReservation et finReservation sont des dates valides (ex: "2026-04-15")
    if (resa.debutReservation && resa.finReservation) {
      let dateEnCours = new Date(resa.debutReservation)
      const dateFin = new Date(resa.finReservation)

      // On boucle jour par jour entre le début et la fin de la réservation
      while (dateEnCours <= dateFin) {
        // On formate en "YYYY-MM-DD" pour comparer facilement
        const annee = dateEnCours.getFullYear()
        const mois = String(dateEnCours.getMonth() + 1).padStart(2, '0')
        const jour = String(dateEnCours.getDate()).padStart(2, '0')
        
        joursOccupes.add(`${annee}-${mois}-${jour}`)
        
        // On passe au jour suivant
        dateEnCours.setDate(dateEnCours.getDate() + 1)
      }
    }
  })
  
  return Array.from(joursOccupes) // On retourne un tableau simple
})

// --- NOUVELLE LOGIQUE DE NAVIGATION ---

// 1. On crée une date réactive fixée au 1er du mois en cours
const dateAffichage = ref(new Date())
dateAffichage.value.setDate(1) 
dateAffichage.value.setHours(0, 0, 0, 0)

// 2. Fonctions pour naviguer
const allerAuMoisSuivant = () => {
  dateAffichage.value = new Date(dateAffichage.value.getFullYear(), dateAffichage.value.getMonth() + 1, 1)
}

const allerAuMoisPrecedent = () => {
  if (!peutReculer.value) return // Sécurité
  dateAffichage.value = new Date(dateAffichage.value.getFullYear(), dateAffichage.value.getMonth() - 1, 1)
}

// 3. Computed pour désactiver la flèche "retour" si on est au mois actuel (on ne réserve pas dans le passé)
const peutReculer = computed(() => {
  const aujourdhui = new Date()
  return dateAffichage.value.getFullYear() > aujourdhui.getFullYear() || 
        (dateAffichage.value.getFullYear() === aujourdhui.getFullYear() && dateAffichage.value.getMonth() > aujourdhui.getMonth())
})

const genererMois = (decalageMois) => {
  const date = new Date(dateAffichage.value.getFullYear(), dateAffichage.value.getMonth() + decalageMois, 1)
  const moisNom = date.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })
  // On met la première lettre en majuscule (ex: Avril 2026)
  const moisNomCapitalized = moisNom.charAt(0).toUpperCase() + moisNom.slice(1)
  
  let premierJourIndex = date.getDay() - 1
  if (premierJourIndex === -1) premierJourIndex = 6

  const joursDansMois = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  
  const jours = []
  for (let i = 0; i < premierJourIndex; i++) jours.push({ vide: true })
  
  for (let d = 1; d <= joursDansMois; d++) {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const dateDeCeJour = new Date(date.getFullYear(), date.getMonth(), d)
    dateDeCeJour.setHours(0, 0, 0, 0)
    
    const aujourdhui = new Date()
    aujourdhui.setHours(0, 0, 0, 0)

    jours.push({
      numero: d,
      fullDate: dateStr,
      isReserve: datesReservees.value.includes(dateStr) || dateDeCeJour < aujourdhui
    })
  }
  
  return { nom: moisNomCapitalized, jours }
}

const moisAffiches = computed(() => [genererMois(0), genererMois(1)])
</script>

<template>
    <div>
        <div class="header">
            <h2>Sélectionnez des dates</h2>
        </div>
        <div class="trait"></div>

        <div class="calendars-area">
      <div class="calendars-nav-header">
        <button class="nav-btn" @click="allerAuMoisPrecedent" :disabled="!peutReculer">
          <svg viewBox="0 0 18 18" width="16" height="16" fill="currentColor">
            <path d="M11.4 4.3L6.7 9l4.7 4.7-1.4 1.4-6.1-6.1 6.1-6.1z"></path>
          </svg>
        </button>

        <div class="month-titles-wrapper">
          <div class="month-title">{{ moisAffiches[0].nom }}</div>
          <div class="month-title">{{ moisAffiches[1].nom }}</div>
        </div>

        <button class="nav-btn" @click="allerAuMoisSuivant">
          <svg viewBox="0 0 18 18" width="16" height="16" fill="currentColor">
            <path d="M6.6 4.3l4.7 4.7-4.7 4.7 1.4 1.4 6.1-6.1-6.1-6.1z"></path>
          </svg>
        </button>
      </div>

      <div class="calendars-container">
        <div v-for="mois in moisAffiches" :key="mois.nom" class="calendar">
          <div class="days-grid">
            <span v-for="label in ['lu','ma','me','je','ve','sa','di']" :key="label" class="day-label">
              {{ label }}
            </span>
            <template v-for="(jour, index) in mois.jours" :key="index">
              <span v-if="jour.vide" class="day empty"></span>
              <span v-else class="day" :class="{ 'unavailable': jour.isReserve }">
                {{ jour.numero }}
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>

        <div class="trait"></div>
        <div class="footer">
            <div class="price-info">
                <p class="price">À partir de {{ prixParNuit }}€</p>
                <p class="subtext">pour 1 nuit</p>
            </div>
            
            <button class="btn-select">Sélectionner</button>
        </div>
    </div>
</template>

<style scoped>
/* --- NOUVEAUX STYLES POUR LA NAVIGATION --- */
.calendars-area {
  position: relative;
}

.calendars-nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 0 10px; /* Pour aligner avec les grilles */
}

.month-titles-wrapper {
  display: flex;
  flex: 1;
  justify-content: space-around;
}

.month-title {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  width: 50%;
  color: #222;
}

.nav-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  color: #717171;
  transition: background-color 0.2s;
}

.nav-btn:hover:not(:disabled) {
  background-color: #f7f7f7;
  color: #222;
}

.nav-btn:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}
.trait{
    height: 1px;
    margin-top: 20px;
    margin-bottom: 20px;
    border: solid 1px gray;
}
.date-picker-popup {
  width: 700px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  padding: 24px;
  font-family: sans-serif;
  color: #222;
}

.header h2 {
  text-align: center;
  font-size: 22px;
  margin-bottom: 20px;
}
.calendars-container {
  display: flex;
  gap: 40px;
  justify-content: center;
}

.month-title {
  text-align: center;
  font-size: 16px;
  margin-bottom: 20px;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 40px);
  text-align: center;
  row-gap: 5px;
}

.day-label {
  font-size: 12px;
  color: #717171;
  margin-bottom: 10px;
}

.day {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  position: relative;
}
.day.unavailable {
  color: #b0b0b0;
  cursor: not-allowed;
}

.day.unavailable::after {
  content: "";
  position: absolute;
  width: 1px;
  height: 24px;
  background-color: #b0b0b0;
  transform: rotate(45deg);
}

/* Status Pill */
.availability-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
}

.status-pill {
  background-color: #e6f4f1;
  color: #006a5e;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.update-text {
  font-size: 12px;
  color: #717171;
}

/* Footer */
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price {
  font-size: 18px;
  font-weight: bold;
  text-decoration: underline;
  margin: 0;
}

.subtext {
  font-size: 13px;
  margin: 0;
}

.constraints {
  font-size: 13px;
  color: #222;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-select {
  background-color: #f6b79d; /* Couleur orange/saumon */
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
</style>