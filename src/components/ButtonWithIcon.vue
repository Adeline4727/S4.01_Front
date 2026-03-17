<script setup>
import { addIcons } from 'ionicons'

// defineProps({
//     icon: String,
//     target: String
// })


defineProps(['icon', 'target'])
</script>

<template>
    <a class="button-with-icon" :href="target">
        <ion-icon :name="icon" size="large"></ion-icon>
        <span><slot></slot></span>
    </a>
</template>

<style>
/* Ton style reste identique */
a.button-with-icon {
    cursor: pointer;
    display: flex;
    gap: 0.75rem;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: #ec5a13;
    padding: 0.5rem 0.75rem;
    border-radius: 1rem;
    min-width: 210px;
}

a.button-with-icon:hover {
    background-color: #ec5a13e5;
}

a.button-with-icon span {
    width: 100%;
}
</style>