<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
    <header>
        <NavBar />
    </header>

    <RouterView />
</template>

<style scoped>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  font-family: sans-serif;
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
</style>
