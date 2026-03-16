<script setup>
import { ref } from 'vue'
let x=  ref(42)
import { RouterLink, RouterView } from 'vue-router'
import InputText from '@/components/InputText.vue'

</script>


<template>
  <h1>Bienvenue au Pro</h1>
  
    
    

      
    <InputText nomInput="numero_siret" class="">numero de siret</InputText>

  <div>
    <RouterLink class="boutton_Suivant centrage" to="/createCompteProSuite">suivant</RouterLink>
  </div>    
    
    <RouterView />
  
</template>

<style scoped>

h1{
  text-align:center;
}


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

.centrage{
  position:absolute;
  left:48%;
  margin-top:25%;
}


</style>
