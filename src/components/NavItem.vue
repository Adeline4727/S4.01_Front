<script setup>
import { addIcons } from 'ionicons'

defineProps({
    target: String,
    label: String,
    icon: String
})
</script>

<template>
    <a class="nav-item" :href="target">
        <ion-icon :name="icon" size="large"></ion-icon>
        <span>{{ label }}</span>
    </a>
</template>

<style>
a.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black;
    text-decoration: none;
}
</style>