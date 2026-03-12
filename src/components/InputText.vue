<script setup>
defineProps({
  nomInput: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="input-group">
    <label :for="nomInput">
      <slot></slot>
    </label>
    <input type="text" :name="nomInput" :id="nomInput">
  </div>
</template>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column; /* Place le label au-dessus de l'input */
  gap: 5px; /* Espace entre le label et l'input */
}

input {
  width: 200px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}


.test{
  color: blue;
}
</style>