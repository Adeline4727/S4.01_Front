<script setup>
import { ref } from "vue";

const props = defineProps({
    icon: String,
    label: String
})

const isActive = ref(false);

function activate() {
    isActive.value = !isActive.value;
}
function close() {
    isActive.value = false;
}


</script>
<template>
    <div class="action-dropdown-with-icon">
        <button @click="activate">{{ label }}</button>
        <ion-icon class="icon" :name="icon"></ion-icon>
        <ion-icon class="cv" name="chevron-forward"></ion-icon>
        <div v-if="isActive" class="adwi-content">
            <div class="adwi-header">
                <h3>{{ label }}</h3>
                <span class="close-btn" @click="close">
                    <ion-icon name="close-outline"></ion-icon>
                </span>
            </div>
            <div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<style>
    .action-dropdown-with-icon {
        position: relative;
        min-width: calc(fit-content + 4rem);
    }

    .action-dropdown-with-icon button {
        width: 100%;
        height: 45px;
        font-size: 1rem;
        padding: 0.75rem 2.75rem;
        outline: none;
        border: 1px solid #888;
        border-radius: 1rem;
        background-color: white;
        cursor: pointer;
    }

    .action-dropdown-with-icon .icon {
        position: absolute;
        z-index: 100;
        font-size: 1.5rem;
        top: 0.625rem;
        left: 0.75rem;
    }
    
    .action-dropdown-with-icon .cv {
        position: absolute;
        font-size: 1.125rem;
        top: 0.875rem;
        right: 0.5rem;
    }

    .action-dropdown-with-icon h3 {
        margin: 0;
        padding: 0;
    }

    .adwi-content {
        background-color: white;
        position: absolute;
        top: 3rem;
        padding: 0.5rem 1.5rem 1rem 1.5rem;
        border-radius: 1rem;
        box-shadow: 0 0.5rem 16px rgba(0, 0, 0, 0.33);
    }

    .adwi-header {
        display: flex;
        gap: 12rem;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 0.25rem;
    }

    .close-btn {
        font-size: 1.5rem;
        width: 2.25rem;
        border-radius: 50%;
        cursor: pointer;
        text-align: center;
    }

    .close-btn ion-icon {
        margin-top: 0.375rem;
    }

    .close-btn:hover {
        background-color: #F5F5F5;
    }
</style>