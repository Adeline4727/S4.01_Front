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

const selection = defineModel({ type: Array, default: () => [] })

const isOpen = ref(false)
const toggle = () => isOpen.value = !isOpen.value

const modeType = computed(() => {
    if (!props.options || props.options.length === 0) return 'empty'
    
    const premierElement = props.options[0]
    if (typeof premierElement === 'string') return 'string'
    
    if (premierElement.hasOwnProperty('serviceId')) return 'service'
    
    return 'equipement'
})

const selectOption = (option) => {
    if (modeType.value) {
        if (!selection.value.includes(option)) {
            selection.value.push(option)
        }
    } else {
        const estDejaSelectionne = selection.value.some(
            sel => sel?.equipementId === option?.equipementId
        )
        if (!estDejaSelectionne) {
            selection.value.push(option)
        }
    }
    isOpen.value = false
}

const optionsDisponibles = computed(() => {
    if (!props.options || props.options.length === 0) return []

    if (modeType.value === 'string') {
        return props.options.filter(opt => !selection.value.includes(opt))
    } 
    else if (modeType.value === 'service') {
        return props.options.filter(opt => 
            !selection.value.some(sel => sel?.serviceId === opt?.serviceId)
        )
    } 
    else {
        const categoriesFiltrees = props.options.map(categorie => {
            return {
                ...categorie,
                equipements: (categorie.equipements || []).filter(eq => 
                    !selection.value.some(sel => sel?.equipementId === eq?.equipementId)
                )
            }
        })
        return categoriesFiltrees.filter(categorie => categorie.equipements.length > 0)
    }
})
</script>

<template>
    <div class="custom-dropdown">
        <div class="dropdown-trigger" @click="toggle">
            <span>{{ placeholder }}</span>
            <span class="chevron" :class="{ 'ouvert': isOpen }">▼</span>
        </div>
        <ul v-if="isOpen" class="dropdown-menu">
            <li v-if="modeType === 'empty'" class="empty">
                Chargement des options...
            </li>
            
            <li v-else-if="optionsDisponibles.length === 0" class="empty">
                Tout a été sélectionné
            </li>
            
            <template v-else-if="modeType === 'string'">
                <li 
                    v-for="option in optionsDisponibles" 
                    :key="option" 
                    @click="selectOption(option)"
                    class="dropdown-item">
                    {{ option }}
                </li>
            </template>
            
            <template v-else-if="modeType === 'service'">
                <li 
                    v-for="option in optionsDisponibles" 
                    :key="option.serviceId" 
                    @click="selectOption(option)"
                    class="dropdown-item">
                    {{ option.nomService }}
                </li>
            </template>
            
            <template v-else>
                <template v-for="categorie in optionsDisponibles" :key="categorie.typeEquipementId">
                    <li class="dropdown-category">
                        {{ categorie.libelleTypeEquipement }}
                    </li>
                    <li 
                        v-for="option in categorie.equipements" 
                        :key="option.equipementId" 
                        @click="selectOption(option)"
                        class="dropdown-item">
                        {{ option.nomEquipement }}
                    </li>
                </template>
            </template>
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
        max-height: 250px;
        overflow-y: auto;
    }

    .dropdown-category {
        padding: 12px 16px 4px 16px;
        font-size: 0.85rem;
        font-weight: 700;
        color: #64748b;
        text-transform: uppercase;
        background-color: #f8fafc;
        border-bottom: 1px solid #f1f5f9;
    }

    .dropdown-item {
        padding: 10px 16px;
        cursor: pointer;
        transition: background-color 0.2s;
        color: #0f172a;
    }

    /* On indente uniquement les items quand ils sont sous une catégorie */
    .dropdown-category + .dropdown-item,
    .dropdown-item + .dropdown-item {
        padding-left: 24px;
    }

    /* On annule l'indentation pour le mode string qui n'a pas de catégorie */
    .dropdown-item:first-child, 
    .dropdown-item:not(.dropdown-category ~ .dropdown-item) {
        padding-left: 16px;
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