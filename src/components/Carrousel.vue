<script setup>
import AnnonceCard from './AnnonceCard.vue';


</script>

<template>
    <div class="carrousel">
        <div class="">
            <slot></slot>
        </div>
    </div>
</template>

<style>
    .carrousel {
        overflow-x: scroll;
    }
</style>