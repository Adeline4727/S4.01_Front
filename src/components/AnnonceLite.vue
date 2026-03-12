<script setup>
import LikeButton from './LikeButton.vue';
import { ref } from 'vue';

defineProps({
    title: String,
    price: Float32Array,
    category: String,
    city: String,
    publishDate: String,
    isNew: Boolean = false, isPro: Boolean = false
})

const liked = ref(false)
</script>

<template>
    <div class="annonce-lite">
        <div class="annonce-image">
            <!-- Template for an actual image -->
            <ion-icon class="camera-icon" name="camera-outline"></ion-icon>
            <span v-if="isNew" class="a-la-une">À la une</span>
            <LikeButton v-model:liked="liked" />
        </div>
        <div class="annonce-infos">
            <div class="annonce-top-part">
                <h3 class="annonce-title">{{ title }}</h3>
                <h3 class="annonce-price">{{ price }} €</h3>
            </div>
            <div class="annonce-bottom-part">
                <span v-if="isPro" class="annonce-pro">Pro</span>
                <span class="annonce-category">{{ category }}</span>
                <span class="annonce-city">{{ city }}</span>
                <span v-if="publishDate!=''" class="annonce-date">{{ publishDate }}</span>
            </div>
        </div>
    </div>
</template>

<style>
    .annonce-lite {
        width: 100%;
        height: 12rem;
        display: flex;
        gap: 1rem;
        border: 1px solid #1F1F1F;
        border-radius: 1rem;
        cursor: pointer;
    }

    .annonce-lite:hover .annonce-title {
        color: chocolate;
    }

    .annonce-image {
        height: 100%;
        width: 14rem;
        background-color: #CACACA;
        position: relative;
        text-align: center;
        border-radius: 1rem 0 0 1rem;
    }
    .annonce-image ion-icon.camera-icon {
        color: #1F1F1F;
        font-size: 8rem;
        margin-top: 1.5rem;
    }
    .a-la-une {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        font-size: 0.875rem;
        width: max-content;
        color: white;
        background-color: blueviolet;
        padding: 0.25rem 0.5rem;
        border-radius: 1rem;
    }
    .like-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
    }
    
    .annonce-infos {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .annonce-infos span {
        font-size: 0.75rem;
        display: block;
        width: fit-content;
        margin: 0.25rem 0;
    }

    .annonce-pro {
        font-weight: bold;
        padding: 0.125rem 0.5rem;
        border: 1px solid black;
        border-radius: 1.5rem;
    }

</style>