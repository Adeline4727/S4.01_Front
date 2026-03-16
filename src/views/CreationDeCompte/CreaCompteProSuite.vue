<script setup>
import { ref } from 'vue'
let x=  ref(42)
import { RouterLink, RouterView } from 'vue-router'
import InputText from '@/components/InputText.vue'

</script>


<template>
  
  
    
    
  <div class="formulaire">
    
        <div class="espacement">
          <InputText nomInput="nom_societe">nom de société</InputText>
        </div>
        <div class="espacement">
          <InputText nomInput="adresse">adresse</InputText>
        </div>
        <div class="espacement">
          <InputText nomInput="ville">ville</InputText>
        </div>
        <div class="espacement">
          <InputText nomInput="code_postale">code postale</InputText>
        </div>
        <div class="espacement">
          <InputText nomInput="secteur-activite">secteur d'activité</InputText>
        </div>
    
  </div>

  <div>
    <RouterLink class="boutton_Suivant centrage" to="/">suivant</RouterLink>
  </div>   
    
    <RouterView />
  
</template>

<style scoped>




.boutton_Suivant{
  
  display: inline-block; 
    text-decoration: none;
  color: white;
  background-color: blue;
  border-radius: 5px;
  
  
  width: 180px; 
  padding-top: 10px;
  padding-bottom: 10px;
  
  
  text-align: center;
  



}
.formulaire {
  display: flex;
  flex-direction: column; /* Empile les div.espacement de haut en bas */
  gap: 20px; /* Met un espace de 20px entre chaque champ, très pratique ! */
  margin-bottom: 100px; /* Laisse de l'espace avant le bouton 'suivant' */
  max-width: 400px; /* Optionnel : empêche les inputs d'être trop larges sur un grand écran */
  border: 2px solid #cccccc;
  padding: 30px;
  
  }

/* La boîte individuelle pour chaque champ */
.espacement {
  display: flex;
  flex-direction: column; /* Place le texte (label) au-dessus de la zone de saisie (input) */
  gap: 5px; /* Petit espace entre le label et l'input */
  margin-bottom: 100px; 


}



</style>