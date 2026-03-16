<script setup>
import LikeButton from './LikeButton.vue';
import { ref } from 'vue';

defineProps({
    title: String,
    category: String,
    price: Float32Array,
    capacity: Int8Array,
    city: String,
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
                <div>
                    <span class="annonce-capacity">{{ capacity }} pers.</span>
                    <span class="separator">&bull;</span>
                    <span class="annonce-category">{{ category }}</span>
                </div>
            </div>
            <div class="annonce-bottom-part">
                <span v-if="isPro" class="annonce-pro">Pro</span>
                <span class="annonce-city">{{ city }}</span>
                <span class="annonce-price">à partir de <b>{{ price }} €</b> / nuit</span>
            </div>
        </div>
    </div>
</template>

<style>
    .annonce-lite {
        width: 100%;
        height: 160px;
        display: flex;
        gap: 1rem;
        cursor: pointer;
    }

    .annonce-lite:hover .annonce-title {
        color: chocolate;
    }

    .annonce-image {
        height: 100%;
        width: 224px;
        background-color: #CACACA;
        position: relative;
        text-align: center;
        border-radius: 1rem 1rem 1rem 0;
    }
    .annonce-image ion-icon.camera-icon {
        color: #1F1F1F;
        font-size: 8rem;
        height: 100%;
        vertical-align: middle;
    }
    .a-la-une {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        width: max-content;
        color: white;
        background-color: blueviolet;
        padding: 0.125rem 0.5rem;
        border-radius: 1rem;
    }
    .like-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
    }
    .annonce-lite h3 {
        margin: 0;
    }
    .annonce-infos {
        padding: 1.125rem 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .annonce-infos span {
        font-size: 0.875rem;
        display: block;
        width: fit-content;
        margin: 0.25rem 0;
    }

    .annonce-top-part div {
        display: flex;
        gap: 0.25rem;
    }

    .annonce-pro {
        font-weight: bold;
        padding: 0.125rem 0.5rem;
        border: 1px solid black;
        border-radius: 1.5rem;
    }

</style>