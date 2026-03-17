<script setup>
defineProps({
    label: { type: String },
    icon: { type: String },
    target: { type: String },
    description: {
        type: String,
        default: ""
    },
})
</script>
<template>
    <div class="account-action-list-element">
        <RouterLink :to="target">
            <div class="label">
                <span class="label-title">{{ label }}</span>
                <span v-if="description != null && description != ''" class="label-desc">{{ description }}</span>
            </div>
            <div class="icon">
                <ion-icon name="chevron-forward"></ion-icon>
            </div>
        </RouterLink>
    </div>
</template>
<style scoped>
    .account-action-list-element {
        width: 100%;
        font-family: sans-serif;
    }
    
    .account-action-list-element:hover {
        background-color: whitesmoke;
    }

    .account-action-list-element a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 0.5rem 1.5rem;
        text-decoration: none;
    }

    .account-action-list-element .icon {
        font-size: 1.5rem;
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 0.5rem;
        color: gray;
        text-align: center;
    }

    .account-action-list-element .icon ion-icon {
        vertical-align: middle;
    }

    .account-action-list-element .label {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        gap: 0.5rem;
    }

    .account-action-list-element .label-title {
        font-size: 1rem;
        font-weight: bold;
        color: black;
    }
    
    .account-action-list-element .label-desc {
        font-size: 0.875rem;
        color: gray;
    }
</style>