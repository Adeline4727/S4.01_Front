<script setup>
const props = defineProps({
    liked: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:liked'])

function like() {
    emit('update:liked', !props.liked)
}
</script>

<template>
    <div class="like-button" @click="like">
        <slot></slot>
        <ion-icon v-if="liked" class="liked" name="heart"></ion-icon>
        <ion-icon v-else name="heart-outline"></ion-icon>
    </div>
</template>

<style>
    .like-button {
        background-color: white;
        width: 1.5rem;
        font-size: 1rem;
        border-radius: 50%;
    }

    .like-button:hover {
        background-color: #F5F5F5;
    }

    .like-button ion-icon {
        margin-top: 0.25rem;
    }
    
    .like-button ion-icon.liked {
        color: indianred;
    }

    slot{
        font-weight: 700;
    }
</style>