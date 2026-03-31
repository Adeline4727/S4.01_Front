<script setup>
import { watch } from 'vue'

const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 99 },
})

const valeur = defineModel({ type: Number, default: 0 })

// On surveille la valeur pour qu'elle ne sorte JAMAIS des bornes
watch(valeur, (newVal) => {
  if (newVal < props.min) {
    valeur.value = props.min
  } else if (newVal > props.max) {
    valeur.value = props.max
  }
}, { immediate: true }) // immediate: true permet de vérifier dès le départ

const decrementer = () => {
  if (valeur.value > props.min) valeur.value--
}

const incrementer = () => {
  if (valeur.value < props.max) valeur.value++
}
</script>

<template>
  <div class="stepper-container">
    <button 
      type="button"
      class="stepper-btn" 
      @click="decrementer" 
      :disabled="valeur <= props.min"
      aria-label="Retirer"
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path fill-rule="evenodd" d="m2,12c0-.62.45-1.12,1-1.12h18c.55,0,1,.5,1,1.12s-.45,1.12-1,1.12H3c-.55,0-1-.5-1-1.12Z"></path>
      </svg>
    </button>

    <span class="stepper-valeur" :class="{ 'valeur-active': valeur > 0 }">
      {{ valeur }}
    </span>

    <button 
      type="button"
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
  border: 1px solid #cbd5e1;
  border-radius: 24px;
  height: 44px;
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
}

.stepper-btn svg { width: 16px; height: 16px; }

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
  font-weight: 600;
  color: #0f172a;
}

.valeur-active { color: #005fcc; }
</style>