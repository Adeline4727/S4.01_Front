<script setup>
import AnnonceCard from './AnnonceCard.vue';


</script>

<template>
    <div class="carrousel">
        <slot></slot>
    </div>
</template>

<style scoped>
    .carrousel {
        display: flex;
        align-items: center;
        justify-content: start;
        overflow-x: scroll;
    }
</style>