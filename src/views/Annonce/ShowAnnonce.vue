<script setup>
import { ref } from 'vue'
let x=  ref(42)
import MapComponent from '@/components/MapComponent.vue';

</script>


<template>
  <div class="about">
    <img src="" alt="" >
    <h1>titre de l'annonce</h1>
    <h2>type de logement</h2>


    <h3>les information clés</h3>

    <p>type de bien</p>

    <p>surface</p>

    <p>nombre de piece</p>

    <p>nombre de chambre</p>

    <h3>Description</h3>


    <MapComponent latitude="" longitude=""></MapComponent>






    
    

  </div>
</template>

<style>

</style>
