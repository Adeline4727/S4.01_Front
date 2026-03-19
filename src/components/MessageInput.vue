<script setup>
const props = defineProps(['message']);
const emit = defineEmits(['update:message'])
</script>
<template>
    <div class="message-input">
        <input type="text" placeholder="Votre message ici..." :value="props.message" @input="emit('update:message', $event.target.value)">
    </div>
</template>
<style scoped>
    :root {
        --color-main: #EC5A13;
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