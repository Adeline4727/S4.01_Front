<script setup>
const props = defineProps({
    shared: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:shared'])

function share() {
    emit('update:shared', !props.shared)
}
</script>

<template>
    <div class="share-button" @click="share">
        <ion-icon v-if="shared" class="shared" name="heart"></ion-icon>
        <ion-icon v-else name="heart-outline"></ion-icon>
    </div>
</template>

<style>
    .share-button {
        background-color: white;
        width: 1.5rem;
        font-size: 1rem;
        border-radius: 50%;
    }

    .share-button:hover {
        background-color: #F5F5F5;
    }

    .share-button ion-icon {
        margin-top: 0.25rem;
    }
    
    .share-button ion-icon.shared {
        color: indianred;
    }
</style>