<script setup>
defineProps({
  nomInput: {
    type: String,
    required: true
  },
})

const model = defineModel()
</script>

<template>
  <div class="input-group">
    <label :for="nomInput">
      <slot></slot>
    </label>
    <input type="text" :name="nomInput" :id="nomInput" v-model="model">
  </div>
</template>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column; /* Place le label au-dessus de l'input */
  align-content: flex-start;
  gap: 5px; /* Espace entre le label et l'input */
}

input {
  //width: 200px;
  //padding: 5px;
  //border: 1px solid #ccc;
  //border-radius: 4px;
  width: 100%;
  border: 1px solid gray;
  font-size: 1rem;
  font-family: sans-serif;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  outline: none;
  background-color: var(--color-main);
}


.test{
  color: blue;
}
</style>