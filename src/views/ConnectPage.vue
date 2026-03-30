<script setup>
import Button from '@/components/Button.vue';
import {onMounted, ref} from 'vue'
import InputText from "@/components/InputText.vue";
import { useAuthStore } from "@/stores/auth.js";
import router from "@/router/index.js";

const store = useAuthStore()

const mail = ref("")
const mailFormatValid = ref(true)
const isMailValid = ref(true)
const isPasswordValid = ref(true)
const passwordShown = ref(false)
const createAccount = ref(false)

const buttonsActivated = ref(true)

async function setIfMailValid() {
  buttonsActivated.value = false

  if (!mail.value.toString().match(/^\S+@\S+\.\S+$/)) {
    mailFormatValid.value = false
  }

  isMailValid.value = await store.doesMailExists(mail)

  if (!isMailValid.value) {
    createAccount.value = true
  }

  passwordShown.value = isMailValid.value
  buttonsActivated.value = true
}

function getCredentials() {
  // return "?mail=" + document.querySelector('#mail').value.replaceAll('\@', '%40') + "&password=" + document.querySelector('#password').value
  return {
    "mail": document.querySelector('#mail').value,
    "password": document.querySelector('#password').value
  }
}

async function login() {
  buttonsActivated.value = false

  let successful = await store.login(getCredentials())
  if(successful === true) {
    await router.replace({name: "home"})

    // Refresh page to show updated fields in NavBar
    router.go(0);
  } else {
    isPasswordValid.value = false
  }

  buttonsActivated.value = true
}

onMounted(() => {
  document.querySelector("#mail").addEventListener("input", () => {
    if(!passwordShown.value)
      isMailValid.value = true
    else {
      isMailValid.value = false
      passwordShown.value = false
    }

    createAccount.value = false
    mailFormatValid.value = true
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
        <InputText nom-input="mail" v-model="mail" :isError="isMailValid ? '' : 'error'" is-required="true" :error-text="mailFormatValid ? 'Ce mail n\'a pas de compte leboncoin associé. Veuillez créer un compte avant de vous connecter.' : 'Le format du mail n\'est pas valide. Veuillez changer d\'adresse mail.'">Mail</InputText>
        <InputText nom-input="password" input-type="password" v-if="passwordShown" is-required="true" :isError="isPasswordValid ? '' : 'error'" error-text="Le mot de passe n'est pas valide.">Mot de passe</InputText>
        <Button v-if="!passwordShown && !createAccount && mailFormatValid" @click="setIfMailValid" :is-disabled="buttonsActivated ? '' : 'error'">Continuer</Button>
        <Button v-if="passwordShown" @click="login" :is-disabled="buttonsActivated ? '' : 'error'">Se connecter</Button>
        <div id="create-account-buttons" v-if="createAccount && mailFormatValid">
          <Button @click="router.replace('')" :is-disabled="buttonsActivated ? '' : 'error'">Créer un compte pour particulirer</Button>
          <Button @click="router.replace('')" :is-disabled="buttonsActivated ? '' : 'error'">Créer un compte pour professionnel</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
#create-account-buttons {
  display: flex;
  gap: 5px;
}

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
