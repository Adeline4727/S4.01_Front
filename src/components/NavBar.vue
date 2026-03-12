<script setup>
import ButtonWithIcon from './ButtonWithIcon.vue'
import NavItem from './NavItem.vue'
import SearchBar from './SearchBar.vue'

import { addIcons } from 'ionicons'
import {
    addCircleOutline,
    searchOutline,
    notificationsOutline,
    heartOutline,
    chatbubbleEllipsesOutline,
    personOutline
} from 'ionicons/icons'
</script>

<template>
    <nav>
        <svg xmlns="http://www.w3.org/2000/svg" width="164" height="30" viewBox="0 0 164 30" aria-hidden="true" class="text-main dark:text-on-surface pro:text-support"><defs><linearGradient id="logo_gradient" x1=".35" y1="15" x2="163.65" y2="15" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#8e44ad"></stop><stop offset="0" stop-color="#8e44ad"></stop><stop offset=".33" stop-color="#d63bb0"></stop><stop offset=".63" stop-color="#d939b0"></stop><stop offset="1" stop-color="#d49dfc"></stop></linearGradient></defs><path fill="url(#logo_gradient)" d="M41.54,25.08c2.57,0,4.16-2.04,4.16-5.07s-1.58-5.07-4.15-5.07-4.15,2.03-4.15,5.07,1.57,5.07,4.14,5.07ZM43.47,10.02c4.9,0,8.13,4.22,8.2,9.91,0,5.78-3.38,10.06-8.34,10.06-2.5.06-4.84-1.2-6.18-3.3h-.08v2.93h-5.38V3.88c0-1.96,1.31-3.19,2.85-3.19s2.85,1.23,2.85,3.19v9.17h.08c1.38-1.92,3.62-3.05,5.99-3.03ZM63.27,25.08c2.58,0,4.15-2.04,4.15-5.07s-1.57-5.07-4.15-5.07-4.15,2.03-4.15,5.07,1.57,5.07,4.15,5.07ZM63.27,10.02c6.06,0,9.99,4.15,9.99,9.99s-3.92,9.99-9.99,9.99-9.99-4.15-9.99-9.99,3.92-9.99,9.99-9.99ZM139.5,10.02c1.57,0,2.88,1.23,2.9,3.19v16.41h-5.76V13.21c0-1.96,1.28-3.19,2.85-3.19ZM139.5,0c1.93,0,3.49,1.57,3.49,3.5s-1.56,3.5-3.49,3.5h0c-1.93,0-3.49-1.57-3.49-3.5,0-1.93,1.57-3.5,3.5-3.5ZM157.51,10.02c4,0,6.14,2.84,6.14,7.14v12.46h-5.76v-10.84c0-2.53-1.19-3.37-2.69-3.37-2.23,0-3.92,1.88-3.92,5.87v8.35h-5.76V13.03c0-1.88,1.23-3,2.69-3s2.68,1.11,2.68,3v.71h.08c1.37-2.31,3.85-3.72,6.53-3.72ZM124.21,25.08c2.58,0,4.15-2.04,4.15-5.07s-1.58-5.07-4.15-5.07-4.14,2.03-4.14,5.07,1.58,5.07,4.14,5.07ZM124.21,10.02c6.07,0,9.99,4.15,9.99,9.99s-3.92,9.99-9.99,9.99-9.99-4.15-9.99-9.99,3.92-9.99,9.99-9.99ZM105.71,15.02c-2.5,0-4.03,1.84-4.03,4.99s1.53,4.99,4.03,4.99c1.43.06,2.78-.68,3.5-1.92h.07l4.19,2.69c-1.46,2.84-4.5,4.22-7.95,4.22-5.99,0-9.68-4.15-9.68-9.99s3.69-9.99,9.68-9.99c3.45,0,6.52,1.37,7.95,4.22l-4.19,2.69h-.07c-.72-1.24-2.06-1.98-3.5-1.92ZM87.54,10.02c4,0,6.14,2.84,6.16,7.14v12.46h-5.76v-10.84c0-2.53-1.19-3.37-2.69-3.37-2.23,0-3.92,1.88-3.92,5.87v8.35h-5.76V13.02c0-1.88,1.21-2.98,2.68-2.98s2.69,1.11,2.69,3v.71h.08c1.36-2.31,3.85-3.72,6.53-3.72ZM16.04,18.87c.02.73.15,1.46.39,2.15l6.42-4.76c-.58-1.07-1.72-1.72-2.94-1.67-1.82,0-3.87,1.37-3.87,4.28ZM21.62,25.29c2.08-.12,3.95-1.32,4.92-3.17l3.79,2.74c-1.45,2.95-4.4,5.13-9.4,5.13-2.36,0-4.64-.87-6.42-2.43-2.51,1.67-4.65,2.38-6.79,2.38-4.32,0-7.36-2.89-7.36-7.23V3.83C.35,1.88,1.65.65,3.2.65s2.85,1.23,2.85,3.18v18.41c0,1.85.81,2.85,2.52,2.85.93,0,1.93-.54,3.24-1.25-.62-1.48-.94-3.08-.93-4.69,0-4.07,2.9-9.14,9-9.14,5.29,0,8.13,3.07,9.31,6.93l-10.18,7.31c.7.67,1.63,1.04,2.6,1.03Z"></path></svg>
        <!-- <img src="/imgLBC.png" alt="img"> -->
        
        <ButtonWithIcon icon="add-circle-outline"><b>Déposer une annonce</b></ButtonWithIcon>

        <SearchBar> </SearchBar>
        
        <div class="nav-items">
            <NavItem target="/mes-recherches" label="Mes recherches" icon="notifications-outline" />
            <NavItem target="/favoris" label="Favoris" icon="heart-outline" />
            <NavItem target="/messages" label="Messages" icon="chatbubble-ellipses-outline" />
            <NavItem target="/connection" label="Se connecter" icon="person-outline" />
        </div>
    </nav>
</template>


<style>
    nav {
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: space-around;
        padding: 2rem;
        width: 100%;
    }

    nav .nav-items {
        display: flex;
        gap: 0.5rem;
    }

    nav .nav-items NavItem {
        width: 100%;
    }
</style>