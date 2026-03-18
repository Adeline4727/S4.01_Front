<script setup>
</script>
<template>
    <div class="message-input">
        <input type="text" placeholder="Votre message ici...">
    </div>
</template>
<style scoped>
    :root {
        --color-main: #ecbe12;
    }
    input {
        width: 100%;
        border: 1px solid gray;
        font-size: 1rem;
        font-family: sans-serif;
        border-radius: 1rem;
        padding: 0.75rem 1rem;
        outline: none;
        background-color: var(--color-main);
    }
</style>