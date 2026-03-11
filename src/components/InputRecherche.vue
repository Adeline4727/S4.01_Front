<script setup>
    
    
</script>

<template>


<input type="text" placeholder="Annecy, appartement T2 etc ...">
  <button class="btn-loupe">
    <img src="/loupeRecherche.png" alt="recherche">
  </button>
</template>


<style scoped>
      input {
    border-radius: 30px;
    width: 350px;
    height: 50px;
    border: 1px solid black;
    padding-left: 15px;
    padding-right: 45px;
    outline: none;
    vertical-align: middle; 
    margin-left:2%;
    /* margin-top:25px; */
  }

  .btn-loupe {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    vertical-align: middle;
    margin-left: -40px; 
    
    /* --- LA SOLUTION POUR REMONTER --- */
    position: relative;
    top: 2px;
  }

  img {
    width: 25px;
    display: block;
  }

</style>
