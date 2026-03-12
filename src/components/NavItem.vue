<script setup>
import { addIcons } from 'ionicons'

defineProps({
    target: String,
    label: String,
    icon: String
})
</script>

<template>
    <RouterLink class="nav-item" :to="target">
        <ion-icon :name="icon" size="large"></ion-icon>
        <span>{{ label }}</span>
    </RouterLink>
</template>

<style>
.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black;
    text-decoration: none;
    padding: 0 0.75rem;
    width: 100%;
}

.nav-item ion-icon {
    font-size: 5rem;
}

.nav-item span {
    font-size: 0.625rem;
    width: 100%;
    text-align: center;
    text-wrap: none;
}
</style>