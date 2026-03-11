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
    padding: 0 0.75rem;
    width: 100%;
}

a.nav-item ion-icon {
    font-size: 5rem;
}

a.nav-item span {
    font-size: 0.625rem;
    width: 100%;
    text-align: center;
}
</style>