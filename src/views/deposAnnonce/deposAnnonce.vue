<script setup>
import Button from '@/components/Button.vue';
import { ref } from 'vue'
const isLogin = ref(true)
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <form id="depos-annonce-form">
        <h1>Commençons par l'essentiel !</h1>
        <p>* champs obligatoire</p>
        <div class="input-group">
          <label>Quel est le titre de l'annonce</label>
          <input class="input-element"/>
        </div>
    </form>
</template>

<style>
    #depos-annonce-form{
        justify-content: center;
        margin-top: 10vh;
        font-family: sans-serif;
        text-align: center;
    }
    .input-group {
        align-items: center;
        justify-content: space-between;
    }
    .input-element{
        margin: 5px;
    }
</style>