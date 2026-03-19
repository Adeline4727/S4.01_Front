<script setup>
import { ref } from 'vue';

defineProps({
    annonce: String,
    utilisateur: String,
    lastMessageDate: String,
    lastMessage: String,
    isActive: Boolean
})

</script>
<template>
    <div :class="['contact-item', { active: isActive }]">
        <div class="annonce-image">
            <ion-icon class="camera-icon" name="camera-outline"></ion-icon>
        </div>
        <div class="contact-infos">
            <h3>{{ annonce }}</h3>
            <span v-if="lastMessage != null && lastMessage != ''">{{ lastMessage }}</span>
            <span class="user-and-date">{{ utilisateur }} <span v-if="lastMessageDate != null && lastMessageDate != ''">&bull; {{ lastMessageDate }}</span></span>
        </div>
    </div>
</template>
<style scoped>
    .contact-item {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding: 1rem;
        height: 8rem;
        cursor: pointer;
        font-family: sans-serif;
    }

    .contact-item.active {
        background-color: rgba(65, 105, 225, 0.33);
        border-left: 4px solid #ec5a13;
    }
    .contact-item:hover {
        background-color: #ec5a132a;
    }


    .annonce-image {
        height: 6rem;
        width: 6rem;
        background-color: #CACACA;
        text-align: center;
        vertical-align: center;
        border-radius: 1rem 1rem 1rem 0;
    }

    .annonce-image ion-icon.camera-icon {
        color: #1F1F1F;
        font-size: 4rem;
        height: 100%;
        vertical-align: middle;
    }

    .contact-infos {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 80%;
        padding: 1rem 0;
    }

    .contact-infos h3 {
        margin: 0;
    }

    .contact-item .user-and-date {
        color: dimgray;
    }
</style>