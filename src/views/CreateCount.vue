<script setup>
import { ref } from 'vue'
let x=  ref(42)
import { RouterLink, RouterView } from 'vue-router'

</script>


<template>
  <div class="about">
    

    
    <h3>vous etes :</h3>
    <nav>
        <div class="decoBoutton">
        <RouterLink class="pasDEco " to="/createComptePro">Professionnel</RouterLink>
    </div>
    <div class="decoBoutton">
        <RouterLink class="pasDEco " to="/">Particulier</RouterLink>
    </div>
      </nav>

      <RouterView />

  </div>
  
</template>

<style>


.pasDEco{
    text-decoration: none;
    color: black;
    padding: 10% 10% 10% 10%;
}
nav{
    display: flex;
    justify-content: center; 

}
.decoBoutton{
    padding: 10% 10% 10% 10%;
    margin-right: 10%;
    margin-left: 10%;
    margin-top: 10%;
    border: grey 1px solid;
    background-color: grey;
    height: 35%;
    width: 15%;
    border-radius: 35px;
    display: flex;
    justify-content: center; /* Centre parfaitement de gauche à droite */
    align-items: center;
    

}
</style>
