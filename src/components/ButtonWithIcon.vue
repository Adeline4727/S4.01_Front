<script setup>
import { addIcons } from 'ionicons'

defineProps({
    icon: String
})
</script>

<template>
    <a class="button-with-icon" :href="target">
        <ion-icon :name="icon" size="large"></ion-icon>
        <slot></slot>
    </a>
</template>

<style>
a.button-with-icon {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: darkorange;
    padding: 0 2rem;
    border-radius: 1rem;
}

ion-icon {
    width: 4rem;
}

</style>