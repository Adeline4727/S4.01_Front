<script setup>

defineProps({
    name: String,
    label: String,
    unit: String,
    required: Boolean = false
});

const model = defineModel();

</script>
<template>
    <div class="field-input">
        <label :for="name">{{ label }}<sup v-if="required">*</sup></label>
        <div>
            <input type="text" v-model="model">
            <span>{{ unit }}</span>
        </div>
    </div>
</template>
<style scoped>
    .field-input > div {
        display: flex;
        align-items: center;
    }

    label {
        font-size: 1rem;
        color: dimgray;
    }
    input {
        width: 100%;
        border: 1px solid gray;
        font-size: 1rem;
        font-family: sans-serif;
        border-radius: 1rem 0 0 1rem;
        padding: 0.5rem 0.75rem;
        outline: none;
    }
    span {
        width: max-content;
        border: 1px solid gray;
        border-left: none;
        font-size: 0.75rem;
        border-radius: 0 1rem 1rem 0;
        padding: 0.57125rem 0.75rem;
        outline: none;
    }
    sup {
        color: red;
    }
</style>