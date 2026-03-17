<script setup>

defineProps({
    name: String,
    label: String,
    required: Boolean = false
});

</script>
<template>
    <div class="field-input">
        <label :for="name">{{ label }}<sup v-if="required">*</sup></label>
        <input type="text">
    </div>
</template>
<style scoped>
    label {
        font-size: 0.75rem;
        color: dimgray;
    }
    input {
        width: 100%;
        border: 1px solid gray;
        font-size: 1rem;
        font-family: sans-serif;
        border-radius: 1rem;
        padding: 0.5rem 0.75rem;
        outline: none;
    }
    sup {
        color: red;
    }
</style>