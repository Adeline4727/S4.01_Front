<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer_ from './components/Footer.vue';
</script>

<template>
  <header>
    <NavBar />
  </header>
  
  <nav>
    <RouterLink to="/ShowAnnonce">ShowAnnonce</RouterLink>
  </nav>

  <RouterView />

  <footer>
    <Footer_ />
  </footer>

</template>

<style scoped>

  header{
    display: flex;
    max-width: 1200px;
    text-align: center;
    margin: 0 auto;
    position: sticky;
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

  footer {
    margin: 8rem 0 0 0;
  }
</style>
