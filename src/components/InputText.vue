<script setup>
import {onMounted} from "vue";

const props = defineProps({
  nomInput: {
    type: String,
    required: true
  },
  inputType: {
    type: String,
    required: false,
    default: "text"
  },
  isError: {
    type: String,
    required: false,
    default: ""
  },
  isRequired: {
    type: String,
    required: false,
    default: ""
  },
  errorText: {
    type: String,
    required: false,
    default: "Champ requis"
  }
})

// onMounted(() => {
//   document.querySelector(".input-group").addEventListener("input", () => {
//     props.isError = "false"
//   })
// })

const model = defineModel()
</script>

<template>
  <div class="input-group">
    <label :for="nomInput">
      <slot></slot> {{isRequired === 'true' ? "*" : ""}}
    </label>
    <input :type="inputType" :name="nomInput" :id="nomInput" v-model="model" :class="{ error: isError !== '' ? '.error' : '' }">
    <p v-if="isError !== ''">{{errorText}}</p>
  </div>
</template>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column; /* Place le label au-dessus de l'input */
  //align-content: flex-start;
  gap: 5px; /* Espace entre le label et l'input */
}

.input-group label {
  align-self: flex-start;
}

input {
  //width: 200px;
  //padding: 5px;
  //border: 1px solid #ccc;
  //border-radius: 4px;
  width: 100%;
  border: 1px solid gray;
  font-size: 1.1rem;
  font-family: sans-serif;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  outline: none;
  background-color: var(--color-main);
}

.error {
  border-color: red;
}

.input-group p {
  color: red;
  align-self: flex-start;
}

.test{
  color: blue;
}
</style>
