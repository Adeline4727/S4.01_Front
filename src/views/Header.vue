<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Button from './components/Button.vue'
import InputRecherche from './components/InputRecherche.vue'
// test branche
</script>

<template>
<header>

  
  <img src="/imgLBC.png" alt="img">
  <Button>ajouter une annonce </Button>


  
  <InputRecherche class="inputRecherche"> </InputRecherche >
  <div>
    <p>❤</p>
    <p> mes favoris </p>
  </div>
  <div>
    <p>&#128512;</p>
    <p>se connecter</p>
  </div>
  
  
  </header>
      <RouterView />
</template>

<style scoped>
*{
  margin:0;
  padding:0;
}
  header{
    display: flex
  }
  header img{
    width: 220px;
    height: auto ; 
  }
  header button{
    border: #EA7737 1px solid;
    border-radius: 15px;
    background-color: #EA7737;
    color : white
  }
  header div{
    margin-right: 3%;
    margin-left: 3%;
  }
  .inputRecherche{
    margin-left: 25%
  }
  
</style>
