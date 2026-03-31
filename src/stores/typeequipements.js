import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import axios from 'axios';

const url = "https://rowlet-village.fr/api/leboncoin/api/TypeEquipements/";

export const useTypeEquipementsStore = defineStore('TypeEquipements', () => {
    const TypeEquipements = ref([])
    const TypeEquipement = ref(null)

    const fetchTypeEquipements = () => {
        axios.get(url + "GetTypeEquipements")
            .then(response => {
                console.log("Données API reçues :", response.data); // <-- Pour vérifier dans ta console
                // Astuce : si .NET utilise ReferenceHandler.Preserve, tes données sont dans $values
                TypeEquipements.value = response.data.$values || response.data;
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des équipements :", error);
        });
    }

    const getTypeEquipementById = (id) => {
        axios.get(url + "GetTypeEquipementById?id=" + id).then(response => {
            TypeEquipement.value = response.data
        })
    }

    const postTypeEquipement = async (newTypeEquipement) => {
        try {
            const response = await axios.post(url+"PostTypeEquipement", newTypeEquipement);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error("ERREURS DE VALIDATION EXACTES :", error.response.data.errors);
                console.error("Détails complets :", error.response.data);
            } else {
                console.error("Erreur serveur :", error);
            }
            throw error;
        }
    };

    return { TypeEquipements, TypeEquipement, getTypeEquipementById, fetchTypeEquipements, postTypeEquipement }
})