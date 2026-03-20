<script setup>
import Button from '@/components/Button.vue';
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import InputText from "@/components/InputText.vue";
import { useAuthStore } from "@/stores/auth.js";

const store = useAuthStore()

const mail = ref("test")
const isMailValid = ref(false)

async function setIfMailValid() {
  try {
    isMailValid.value = await store.doesMailExists(mail)
    console.log(isMailValid.value)
  } catch (e) {
    console.log("Error: " + e)
  }
}

</script>


<template>
  <div id="connection-container">
    <div class="card">
      <h1 id="title">Connectez-vous ou créez votre compte leboncoin</h1>
      
<!--      <div class="tabs">-->
<!--        <button -->
<!--          :class="{ active: isLogin }" -->
<!--          @click="isLogin = true"-->
<!--        >-->
<!--          Connexion-->
<!--        </button>-->
<!--        <button -->
<!--          :class="{ active: !isLogin }" -->
<!--          @click="isLogin = false"-->
<!--        >-->
<!--          Créer un compte-->
<!--        </button>-->
<!--      </div>-->

      <form class="form-content">
        <InputText nom-input="mail" v-model="mail">Mail</InputText>
        <InputText nom-input="password" v-if="isMailValid.value">Mot de passe</InputText>
        <Button @click="setIfMailValid">Continuer</Button>
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
}

#title {
  margin-left: 1vw;
  //background-color: #ff8c37;
  color: black;
  padding: 10px;
  text-align: left;
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
  padding: 30px;
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
