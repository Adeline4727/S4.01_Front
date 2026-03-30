<script setup>
defineProps({
    label: { type: String },
    icon: { type: String },
    description: {
        type: String,
        default: ""
    },
})
</script>
<template>
    <div class="account-action-list-with-icon">
        <div class="header">
            <div class="icon">
                <ion-icon :name="icon"></ion-icon>
            </div>
            <div class="label">
                <span class="label-title">{{ label }}</span>
                <span v-if="description != null && description != ''" class="label-desc">{{ description }}</span>
            </div>
        </div>
        <div class="list">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped>
    .account-action-list-with-icon {
        width: 100%;
        font-family: sans-serif;
        border: 1px solid lightgray;
        border-radius: 1rem;
    }

    .account-action-list-with-icon .header {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
        text-decoration: none;
    }
    .account-action-list-with-icon .list {
        padding-bottom: 1rem;
    }

    .account-action-list-with-icon .icon {
        font-size: 1.75rem;
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 0.5rem;
        color: black;
        background-color: lightgray;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .account-action-list-with-icon .label {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        gap: 0.5rem;
    }

    .account-action-list-with-icon .label-title {
        font-size: 1.25rem;
        font-weight: bold;
        color: black;
    }
    
    .account-action-list-with-icon .label-desc {
        color: gray;
    }
</style>