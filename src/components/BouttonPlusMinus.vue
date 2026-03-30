<script setup>
import { ref, computed, onMounted } from 'vue'

// Permet de définir une valeur de départ et un minimum (ex: 1 pour Adulte, 0 pour Bébé)
const props = defineProps({
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 99
  },
})

const valeur = defineModel({ type: Number, default: 0 })

const decrementer = () => {
  if (valeur.value > props.min) {
    valeur.value--
  }
}

const incrementer = () => {
  if (valeur.value < props.max) {
    valeur.value++
  }
}
</script>

<template>
  <div class="stepper-container">
    <button 
      class="stepper-btn" 
      @click="decrementer" 
      :disabled="valeur <= props.min"
      aria-label="Retirer"
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path fill-rule="evenodd" d="m2,12c0-.62.45-1.12,1-1.12h18c.55,0,1,.5,1,1.12s-.45,1.12-1,1.12H3c-.55,0-1-.5-1-1.12Z"></path>
      </svg>
    </button>

    <input v-model="valeur" class="stepper-valeur" :class="{ 'valeur-active': valeur > 0 }"></input>

    <button 
      class="stepper-btn"
      @click="incrementer" 
      :disabled="valeur >= props.max"
      aria-label="Ajouter">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path fill-rule="evenodd" d="m12,2c.55,0,1,.45,1,1v7.94h8c.55,0,1,.45,1,1s-.45,1-1,1h-8v8.06c0,.55-.45,1-1,1s-1-.45-1-1v-8.06H3c-.55,0-1-.45-1-1s.45-1,1-1h8V3c0-.55.45-1,1-1Z"></path>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.stepper-container {
  display: inline-flex;
  align-items: center;
  border: 1px solid #cbd5e1; /* Gris clair comme sur l'image */
  border-radius: 24px; /* Bords arrondis */
  height: 44px;
  overflow: hidden;
  background-color: white;
}

.stepper-btn {
  width: 44px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #64748b;
  transition: background-color 0.2s;
}

.stepper-btn svg {
  width: 16px;
  height: 16px;
}

.stepper-btn:hover:not(:disabled) {
  background-color: #f1f5f9;
}

/* Grise le bouton quand on ne peut plus cliquer (ex: à 0) */
.stepper-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.stepper-valeur {
  width: 44px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #cbd5e1;
  border-right: 1px solid #cbd5e1;
  font-weight: 500;
  color: #0f172a;
}

/* Met le chiffre en bleu s'il est supérieur à 0 (comme sur l'image) */
.valeur-active {
  color: #005fcc; 
}
</style>