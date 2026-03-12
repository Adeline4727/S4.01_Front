<script setup>
import Button from '@/components/Button.vue';
import { ref } from 'vue'
let x=  ref(42)
const isLogin = ref(true)
import { RouterLink, RouterView } from 'vue-router'
import SearchFieldWithIcon from '@/components/SearchFieldWithIcon.vue';

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
        <RouterLink to="/createCompteParticulier">
          <Button class="particulier-btn">Compte particulier</Button>
        </RouterLink>
        <RouterLink to="/createComptePro">
          <Button class="professionnel-btn" to="/createComptePro">Compte professionnel</Button>
        </RouterLink>
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
  background: white;
  -webkit-box-shadow: 0px 0px 9px 7px rgba(41,27,9,0.30); 
  box-shadow: 0px 0px 9px 7px rgba(41,27,9,0.30);
}

#title {
  margin: 0;
  background-color: #ff8c37;
  color: white;
  padding: 10px;
  text-align: center;
}

.tabs {
  display: flex;
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

.submit-btn {
  background-color: #ff8c37;
  border-radius: 10px;
  padding: 5px 20px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
