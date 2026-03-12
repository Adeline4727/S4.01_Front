<script setup>
defineProps({
    icon: String,
    placeholder: String,
    hasChevron: Boolean = false
})
</script>
<template>
    <div class="searchbar-with-icon">
        <input type="text" :placeholder="placeholder">
        <ion-icon class="icon" :name="icon"></ion-icon>
        <ion-icon v-if="hasChevron" class="cv" name="chevron-down"></ion-icon>
    </div>
</template>
<style>
    .searchbar-with-icon {
        position: relative;
        min-width: calc(fit-content + 4rem);
    }

    .searchbar-with-icon input {
        width: 100%;
        font-size: 1rem;
        padding: 0.75rem 2.5rem;
        outline: none;
        border: 1px solid #888;
        border-radius: 1rem;
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
        right: 0.5rem;
    }
</style>