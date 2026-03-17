<script setup>

</script>
<template>
    <div class="message-item">
        <slot></slot>
    </div>
</template>
<style scoped>
    .message-item {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: start;
        border: 1px solid gray;
        border-radius: 1rem 1rem 1rem 0;
    }
</style>