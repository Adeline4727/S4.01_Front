<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    options: {
        type: Array,
        required: true
    },
    placeholder: {
        type: String,
        default: 'Sélectionner...'
    }
})

// Ce defineModel fait le lien direct avec le v-model du parent (le tableau)
const selection = defineModel({ type: Array, default: () => [] })

const isOpen = ref(false)
const toggle = () => isOpen.value = !isOpen.value

const selectOption = (option) => {
    // On vérifie que l'option n'est pas déjà dans le tableau
    if (!selection.value.includes(option)) {
        selection.value.push(option)
    }
    isOpen.value = false // Referme le menu après sélection
}

// On cache les options qui sont déjà dans la liste du parent
const optionsDisponibles = computed(() => {
    return props.options.filter(opt => !selection.value.includes(opt))
})
</script>

<template>
    <div class="custom-dropdown">
        <div class="dropdown-trigger" @click="toggle">
            <span>{{ placeholder }}</span>
            <span class="chevron" :class="{ 'ouvert': isOpen }">▼</span>
        </div>
        
        <ul v-if="isOpen" class="dropdown-menu">
            <li v-if="optionsDisponibles.length === 0" class="empty">
                Tout a été sélectionné
            </li>
            <li 
                v-for="option in optionsDisponibles" 
                :key="option" 
                @click="selectOption(option)"
                class="dropdown-item"
            >
                {{ option }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.custom-dropdown {
    position: relative;
    width: 100%;
}

.dropdown-trigger {
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 10px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background: white;
}

.chevron {
    font-size: 12px;
    transition: transform 0.2s;
}

.chevron.ouvert {
    transform: rotate(180deg);
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    margin-top: 4px;
    padding: 0;
    list-style: none;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 10;
    max-height: 200px;
    overflow-y: auto;
}

.dropdown-item {
    padding: 10px 16px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.dropdown-item:hover {
    background-color: #f1f5f9;
}

.empty {
    padding: 10px 16px;
    color: #94a3b8;
    font-style: italic;
}
</style>