<script setup>
defineProps({
    fromWho: String,
    me: Boolean
})
</script>
<template>
    <div :class="['message-item', {'me': me}]">
        <span class="profile-pic">{{ fromWho.charAt(0) }}</span>
        <div class="message-content">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped>
    .message-item {
        display: flex;
        align-items: end;
        gap: 0.5rem;
    }

    .profile-pic {
        width: 1.5rem;
        height: 1.5rem;
        background-color: navy;
        color: white;
        line-height: 150%;
        text-align: center;
        border-radius: 50%;
    }
    h1,h2,h3 {
        margin: 0;
        padding: 0;
    }

    .message-item .message-content {
        padding: 0.25rem 1rem;
        display: flex;
        flex-direction: column;
        align-items: start;
        border: 1px solid gray;
        border-radius: 1rem 1rem 1rem 0;
    }

    .message-item.me {
        flex-direction: row-reverse;
    }

    .message-item.me .message-content {
        border-radius: 1rem 1rem 0 1rem;
    }
</style>