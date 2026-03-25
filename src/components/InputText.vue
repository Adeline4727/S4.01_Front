<script setup>
defineProps({
  nomInput: {
    type: String,
    required: true
  },
  // NOUVEAU : Permet de choisir si c'est du texte, un email, ou un mot de passe
  typeInput: {
    type: String,
    default: 'text' // Par défaut ce sera du texte normal
  }
})

const model = defineModel()
</script>

<template>
  <div class="input-group">
    <label :for="nomInput">
      <slot></slot>
    </label>
    <input 
      :type="typeInput" 
      :name="nomInput" 
      :id="nomInput" 
      v-model="model"
    >
  </div>
</template>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  gap: 5px;
}

input {
  /* Anciens styles retirés proprement avec de vrais commentaires CSS */
  /* width: 200px; */
  /* padding: 5px; */
  /* border: 1px solid #ccc; */
  /* border-radius: 4px; */
  
  width: 100%;
  border: 1px solid gray;
  font-size: 1rem;
  font-family: sans-serif;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  outline: none;
  background-color: var(--color-main); /* Assure-toi que cette variable existe bien dans ton CSS global ! */
}

.test {
  color: blue;
}
</style>