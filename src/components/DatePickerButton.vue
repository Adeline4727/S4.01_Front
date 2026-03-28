<script setup>
import { computed } from 'vue'

const props = defineProps({
  date: {
    type: String, // Format attendu YYYY-MM-DD
    default: null
  } 
})

// Formater la date en DD/MM/YYYY pour l'affichage
const dateAffichee = computed(() => {
  if (!props.date) return '-- / -- / ----'
  const [year, month, day] = props.date.split('-')
  return `${day}/${month}/${year}`
})


</script>

<template>
  <button class="date-picker-btn" type="button">
    <span class="date-text">{{ dateAffichee }}</span>
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  </button>
</template>

<style scoped>
.date-picker-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background-color: white;
  border: 1px solid #b0b0b0;
  border-radius: 8px;
  cursor: pointer;
  color: #222;
  font-size: 16px;
  margin-top: 8px;
}

.date-picker-btn:hover {
  border-color: #222;
}

.date-text {
  font-family: monospace; /* Pour que les tirets s'alignent bien */
  font-size: 15px;
}
</style>