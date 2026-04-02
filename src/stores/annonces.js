import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const url = "https://rowlet-village.fr/api/leboncoin/api/Annonces/";

export const useAnnoncesStore = defineStore('annonces', () => {
    const annonces = ref([])
    const annonce = ref(null)

    // 1. On accepte les paramètres limit et page (avec des valeurs par défaut)
    const fetchAnnonces = async ({ limit = 6, page = 1 } = {}) => {
        try {
            // 2. On passe les paramètres dans l'URL (ça créera ?limit=6&page=1)
            const response = await axios.get(url + "GetAnnonces", {
                params: {
                    limit: limit,
                    page: page
                }
            });

            // 3. Logique d'ajout ou de remplacement
            if (page === 1) {
                // Premier chargement (ex: arrivée sur la page d'accueil)
                annonces.value = response.data;
            } else {
                // Clic sur "Voir plus" : on fusionne l'ancien tableau avec les nouveaux résultats
                annonces.value = [...annonces.value, ...response.data];
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des annonces :", error);
        }
    }

    const getAnnonceById = (id) => {
        axios.get(url + "GetAnnonceById?id=" + id).then(response => {
            annonce.value = response.data
        })
    }

    const getAnnoncesWithFilter = (filter) => {
        axios.get(url + "GetAnnoncesWithFilter?filter=" + filter).then(response => {
            annonces.value = response.data
        })
    }

    const postAnnonce = async (newAnnonce) => {
        try {
            const response = await axios.post(url+"PostAnnonce", newAnnonce);
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

    return { annonces, annonce, getAnnonceById, fetchAnnonces, postAnnonce, getAnnoncesWithFilter }
})