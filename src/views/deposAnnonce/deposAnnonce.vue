<script setup>
import Button from '@/components/Button.vue';
import { ref } from 'vue'
const isLogin = ref(true)
const step = ref(1)
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <form id="depos-annonce-form">
        <div v-if="step == 1">
            <h1>Commençons par l'essentiel !</h1>
            <p>* champs obligatoire</p>
            <div class="input-group">
              <label>Quel est le titre de l'annonce</label>
              <input class="input-element"/>
            </div>
            <Button @click="step+=1">Suivant</Button>
        </div>
        <div v-else-if="step == 2">
            <h1>Où se situe votre bien ?</h1>
        </div>
    </form>
</template>

<style scoped>
    #depos-annonce-form{
        justify-content: center;
        margin-top: 10vh;
        font-family: sans-serif;
        text-align: center;
        width: 100%;
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