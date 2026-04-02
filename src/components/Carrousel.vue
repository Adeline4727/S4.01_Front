<script setup>
import AnnonceCard from './AnnonceCard.vue';
import { ref } from 'vue';

const carrouselRef = ref(null);
const isDown = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

// Gestion du début du clic
const handleMouseDown = (e) => {
    isDown.value = true;
    carrouselRef.value.classList.add('active');
    // On calcule la position de départ de la souris moins le décalage du scroll actuel
    startX.value = e.pageX - carrouselRef.value.offsetLeft;
    scrollLeft.value = carrouselRef.value.scrollLeft;
};

// Gestion de la fin du clic
const handleMouseLeaveOrUp = () => {
    isDown.value = false;
    carrouselRef.value.classList.remove('active');
};

// Gestion du mouvement
const handleMouseMove = (e) => {
    if (!isDown.value) return; // On n'exécute rien si le bouton n'est pas enfoncé
    e.preventDefault();
    
    const x = e.pageX - carrouselRef.value.offsetLeft;
    // Multiplier par 2 ou 3 pour augmenter la vitesse du scroll (le "momentum")
    const walk = (x - startX.value) * 2; 
    carrouselRef.value.scrollLeft = scrollLeft.value - walk;
};
</script>

<template>
    <div 
        class="carrousel" 
        ref="carrouselRef"
        @mousedown="handleMouseDown"
        @mouseleave="handleMouseLeaveOrUp"
        @mouseup="handleMouseLeaveOrUp"
        @mousemove="handleMouseMove"
    >
        <slot></slot>
    </div>
</template>

<style scoped>
    .carrousel {
        display: flex;
        align-items: stretch; /* Permet aux cartes et au bouton d'avoir la même hauteur si besoin */
        justify-content: flex-start;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        cursor: grab;
        user-select: none; /* Empêche la sélection de texte pendant le drag */
        gap: 1.5rem; /* Espace entre les cartes */
        padding: 1rem;
        scrollbar-width: none; /* Cache la scrollbar sur Firefox */
    }

    /* Cache la scrollbar sur Chrome/Safari */
    .carrousel::-webkit-scrollbar {
        display: none;
    }

    .carrousel.active {
        cursor: grabbing;
        scroll-behavior: auto; /* Désactive le smooth scroll pendant le drag pour plus de réactivité */
    }

    /* On s'assure que les éléments enfants ne bloquent pas le drag */
    :deep(.Card), :deep(.bouton-voir-plus-container) {
        flex: 0 0 auto; /* Empêche les cartes de rétrécir */
        display: flex;
    }
</style>