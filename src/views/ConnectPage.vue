<script setup>
import Button from '@/components/Button.vue';
import {onMounted, ref} from 'vue'
import InputText from "@/components/InputText.vue";
import { useAuthStore } from "@/stores/auth.js";
import router from "@/router/index.js";

const store = useAuthStore()

const mail = ref("")
const isMailValid = ref(true)
const isPasswordValid = ref(true)
const passwordShown = ref(false)

async function setIfMailValid() {
  isMailValid.value = await store.doesMailExists(mail)
  passwordShown.value = isMailValid.value
}

function getCredentials() {
  return "?mail=" + document.querySelector('#mail').value.replaceAll('\@', '%40') + "&password=" + document.querySelector('#password').value
}

async function login() {
  let successful = await store.login(getCredentials())
  if(successful === true) {
    await router.replace({name: "home"})
  } else {
    isPasswordValid.value = false
  }

}

onMounted(() => {
  document.querySelector("#mail").addEventListener("input", () => {
      isMailValid.value = true
  })

  document.querySelector(".form-content").addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
      event.preventDefault()
    }
  })
})



</script>


<template>
  <div id="connection-container">
    <div class="card">
      <h1 id="title">Connectez-vous ou créez votre compte leboncoin</h1>

      <form class="form-content">
        <InputText nom-input="mail" v-model="mail" :isError="isMailValid ? '' : 'error'" is-required="true" error-text="Ce mail n'a pas de compte leboncoin associé. Veuillez créer un compte avant de vous connecter.">Mail</InputText>
        <InputText nom-input="password" input-type="password" v-if="passwordShown" is-required="true" :isError="isPasswordValid ? '' : 'error'" error-text="Le mot de passe n'est pas valide.">Mot de passe</InputText>
        <Button v-if="!passwordShown" @click="setIfMailValid">Continuer</Button>
        <Button v-if="passwordShown" @click="login">Se connecter</Button>
      </form>
    </div>
  </div>
</template>

<style scoped>
#connection-container {
  display: flex;
  justify-content: center;
  margin-top: 10vh;
  font-family: sans-serif;
}

.card {
  width: 700px;
  background: white;
  -webkit-box-shadow: 0px 0px 9px 7px rgba(41,27,9,0.30); 
  box-shadow: 0px 0px 9px 7px rgba(41,27,9,0.30);
  border-radius: 15px;
  padding: 30px 50px;
}

#title {
  color: black;
  padding: 10px;
  text-align: left;
  margin-bottom: 30px;
}

.tabs {
  display: flex;
}

.tabs button {
  flex: 1;
  padding: 10px;
  border: none;
  cursor: pointer;
  background-color: #e67e22;
  color: white;
  font-weight: bold;
}

/* Style pour l'onglet non-sélectionné (plus sombre ou bordure) */
.tabs button:not(.active) {
  background-color: #ff8c37;
}

.form-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.input-group {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

input {
  border-radius: 15px;
  padding: 5px 10px;
  width: 60%;
}

/*
.submit-btn {
  background-color: #ff8c37;
  border-radius: 10px;
  padding: 5px 20px;
  margin-top: 10px;
  cursor: pointer;
}
*/
</style>
