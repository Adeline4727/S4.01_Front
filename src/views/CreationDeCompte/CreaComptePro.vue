<script setup>
import { ref } from 'vue'
let x=  ref(42)
import { RouterLink, RouterView } from 'vue-router'

</script>


<template>
  <div class="about">
    <h1>A propos</h1>
    <h3> {{x}} </h3>

    <h1>Bienvenue au Pro</h1>

    <nav>
        
        <RouterLink to="/createCompte">creer un compte</RouterLink>
      </nav>
      <label >numero de siret</label>
  <input type="text" name="" id="">
  <label >nom de l'entreprise</label>
  <input type="text" name="" id="">
  
      <RouterView />

  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
