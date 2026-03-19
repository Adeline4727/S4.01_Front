<script setup>
import { addIcons } from 'ionicons'

</script>

<template>
    <span class="button-with-icon" :href="target">
        <ion-icon name="send"></ion-icon>
    </span>
</template>

<style>

.button-with-icon {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: #ec5a13;
    border-radius: 1rem;
    width: 3rem;
    height: 2.75rem;
}

.button-with-icon:hover {
    background-color: #ec5a13e5;
}

</style>