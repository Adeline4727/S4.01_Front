<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import InputText from '@/components/InputText.vue' // Ajuste le chemin si besoin

let x = ref(42)
</script>

<template>
  <div class="page-layout">
    

    <div class="formulaire">
        <InputText nomInput="email">email</InputText>
        <div>
        <input type="radio" name="radioHomme">Homme</input>  
        <input type="radio" name="radioFemme">Femme</input>
        </div>
      <InputText nomInput="nom_societe">nom</InputText>
      <InputText nomInput="adresse">prenom</InputText>
      <InputText nomInput="ville">ville</InputText>
      <InputText nomInput="code_postale">code postale</InputText>
      <InputText nomInput="secteur-activite">secteur d'activité</InputText>
    </div>
  </div>
  <div class="colonne-gauche">
      <RouterLink class="boutton_Suivant" to="/">suivant</RouterLink>
    </div> 
  <RouterView />
</template>

<style scoped>

.page-layout {
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center; 
}

.formulaire {
  display: flex;
  flex-direction: column;
  gap: 20px; 
  
  
  border: 3px solid black; 
  border-radius: 15px; 
  padding: 40px; 
  background-color: white; 
  width: fit-content; 
}

.boutton_Suivant {
  display: inline-block; 
  text-decoration: none;
  color: white;
  background-color: blue;
  border-radius: 5px;
  width: 180px; 
  padding: 10px 0;
  text-align: center;
  margin-bottom: 30px; 
}


.colonne-gauche {
 display: absolute;
 padding-left:47%;
  
}
</style>