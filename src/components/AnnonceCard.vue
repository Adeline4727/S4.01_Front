<script setup>
import LikeButton from './LikeButton.vue';
import { ref } from 'vue';

defineProps({
    title: String,
    price: Number,
    // category: String,
    image: String,
    owner: String,
    city: String,
    publishDate: String,
    isPro: { type: Boolean, default: false },
    redirection: {
      type: Object,
      required: true,
    }
})

const liked = ref(false)
</script>

<template>
    <div class="annonce-card">
        <div class="annonce-proprio">
            <div class="profile-pic-proprio">
                <span>{{ owner?.charAt(0) }}</span>
            </div>
            <span>{{ owner }}</span>
        </div>
        <div class="annonce-image">

            <RouterLink :to="redirection">

              <img v-if="image" :src="image" alt="image de l'annonce" class="img-fill">
              <ion-icon v-else class="camera-icon" name="camera-outline"></ion-icon>
            </RouterLink>

            <LikeButton v-model:liked="liked" />
        </div>
        <div class="annonce-infos">
            <div class="annonce-top-part">
                <h3 class="annonce-title">{{ title }}</h3>
                <h3 class="annonce-price">{{ price }} €</h3>
            </div>
            <div class="annonce-bottom-part">
                <span v-if="isPro" class="annonce-pro">Pro</span>
                <span class="annonce-city">{{ city }}</span>
                <span v-if="publishDate!=''" class="annonce-date">{{ publishDate }}</span>
            </div>
        </div>
    </div>
</template>

<style>
    .annonce-card {
        padding: 1rem;
        width: 224px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .annonce-card .annonce-proprio {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }
    .annonce-card .profile-pic-proprio {
        width: 1.5rem;
        height: 1.5rem;
        text-align: center;
        border-radius: 1.5rem;
        background-color: navy;
        color: white;
    }
    .annonce-card .profile-pic-proprio span {
        height: 100%;
        line-height: 1.5rem;
    }

    /* .annonce-card:hover .annonce-title {
        color: chocolate;
    } */

    .annonce-card .annonce-image {
        height: 280px;
        width: 224px;
        background-color: #CACACA;
        position: relative;
        text-align: center;
        vertical-align: center;
        border-radius: 1rem 1rem 1rem 0;
        overflow: hidden;
    }
    .annonce-card .annonce-image ion-icon.camera-icon {
        color: #1F1F1F;
        font-size: 8rem;
        height: 100%;
        vertical-align: middle;
    }
    .annonce-card .like-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        cursor: pointer;
    }
    
    .annonce-card .annonce-infos {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;
    }
    .annonce-card .annonce-infos h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
    }

    .annonce-card .annonce-infos span {
        font-size: 0.75rem;
        display: block;
        width: fit-content;
        margin: 0.25rem 0;
    }

    .annonce-card .annonce-pro {
        font-weight: bold;
        padding: 0.125rem 0.5rem;
        border: 1px solid black;
        border-radius: 1.5rem;
    }
    .annonce-card .img-fill{
	    height: 100%;
        margin: auto;
        justify-content: center;
        vertical-align: middle;
    }

</style>