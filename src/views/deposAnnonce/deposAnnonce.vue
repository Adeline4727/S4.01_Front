<script setup>
import Button from '@/components/Button.vue';
import { ref } from 'vue'
const isLogin = ref(true)
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div>
        <h1>Commençons par l'essentiel !</h1>
        <p>* champs obligatoire</p>
        <div class="input-group">
          <label>Quel est le titre de l'annonce</label>
          <input/>
        </div>
    </div>
</template>

<style>

</style>