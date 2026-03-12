<script setup>
import Button from '@/components/Button.vue';
import { ref } from 'vue'
let x=  ref(42)
const isLogin = ref(true)
import { RouterLink, RouterView } from 'vue-router'

</script>


<template>
  <div id="connection-container">
    <div class="card">
      <h1 id="title">Connectez-vous ou Créez un compte</h1>
      
      <div class="tabs">
        <button 
          :class="{ active: isLogin }" 
          @click="isLogin = true"
        >
          Connexion
        </button>
        <button 
          :class="{ active: !isLogin }" 
          @click="isLogin = false"
        >
          Créer un compte
        </button>
      </div>

      <form v-if="isLogin" class="form-content">
        <div class="input-group">
          <label>mail :</label>
          <input type="email" />
        </div>
        <div class="input-group">
          <label>mdp :</label>
          <input type="password" />
        </div>
        <Button class="submit-btn">Connexion</Button>
      </form>

      <form v-else class="form-content">
        <Button class="particulier-btn">Compte particulier</Button>
        <Button class="professionnel-btn">Compte professionnel</Button>
      </form>
    </div>
  </div>
</template>

<style>
#connection-container {
  display: flex;
  justify-content: center;
  margin-top: 10vh;
  font-family: sans-serif;
}

.card {
  width: 500px;
  border: 2px solid black;
  background: white;
}

#title {
  margin: 0;
  background-color: #ff8c37;
  color: white;
  padding: 10px;
  text-align: center;
  border-bottom: 2px solid black;
}

.tabs {
  display: flex;
  border-bottom: 2px solid black;
}

.tabs button {
  flex: 1;
  padding: 10px;
  border: none;
  cursor: pointer;
  background-color: #ff8c37;
  color: white;
  font-weight: bold;
}

/* Style pour l'onglet non-sélectionné (plus sombre ou bordure) */
.tabs button:not(.active) {
  background-color: #e67e22; 
  border-left: 1px solid black;
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
  border: 2px solid black;
  border-radius: 15px;
  padding: 5px 10px;
  width: 60%;
}

.submit-btn {
  background-color: #ff8c37;
  border: 2px solid black;
  border-radius: 10px;
  padding: 5px 20px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
