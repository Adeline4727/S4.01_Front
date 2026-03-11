<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Button from './components/Button.vue'
import InputRecherche from './components/InputRecherche.vue'
</script>

<template>
<header>

  
  <img src="/imgLBC.png" alt="img">
  <Button>ajouter une annonce </Button>


  
  <InputRecherche > </InputRecherche >
  <div class="separtationDiv allignementVerticale">
    <p>❤</p>
    <p> mes favoris </p>
  </div>
  <div class="separtationDiv allignementVerticale">
    <p>&#128512;</p>
    <p>se connecter</p>
  </div>

  <div class="allignementVerticale">
    <p>&#128512;</p>
    <p>mes recherches</p>
  </div>
  
  
  </header>
   <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>

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
    width: 250px;
    height: auto ; 
    margin-left:5%;
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
  .separtationDiv{
    margin-left:5%;
  }
  
  
  .allignementVerticale{
    margin-top:15px;
  }
</style>
