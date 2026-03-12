<script setup>
const props = defineProps({
    icon: String,
    label: String,
    isActive: Boolean = false
})

const emit = defineEmits(['update:isActive'])

function activate() {
    emit('update:isActive', !props.isActive)
}

</script>
<template>
    <div class="searchbar-with-icon">
        <button @click="activate">{{ label }}</button>
        <ion-icon class="icon" :name="icon"></ion-icon>
        <ion-icon class="cv" name="chevron-down"></ion-icon>
        <div v-if="isActive" class="sbwi-content">
            <h3>{{ label }}</h3>
            <slot></slot>
        </div>
    </div>
</template>
<style>
    .searchbar-with-icon {
        position: relative;
    }

    .searchbar-with-icon button {
        position: absolute;
        width: 100%;
        font-size: 1rem;
        padding: 0.75rem;
        padding-left: 2.5rem;
        outline: none;
        border: 1px solid #888;
        border-radius: 1rem;
        background-color: white;
    }

    .searchbar-with-icon .icon {
        position: absolute;
        z-index: 100;
        font-size: 1.5rem;
        top: 0.5625rem;
        left: 0.75rem;
    }
    
    .searchbar-with-icon .cv {
        position: absolute;
        font-size: 1.125rem;
        top: 0.875rem;
        right: -2.5rem;
    }
</style>