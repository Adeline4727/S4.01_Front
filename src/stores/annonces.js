import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import axios from 'axios';

const url = "https://rowlet-village.fr/api/leboncoin/api/Annonces/";

export const useAnnoncesStore = defineStore('annonces', () => {
    const annonces = ref([])
    const annonce = ref(null)

    const fetchAnnonces = () => {
        axios.get(url + "GetAnnonces").then(response => {
            annonces.value = response.data
        })
    }

    const getAnnonceById = (id) => {
        axios.get(url + "GetAnnonceById?id=" + id).then(response => {
            annonce.value = response.data
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

    return { annonces, annonce, getAnnonceById, fetchAnnonces, postAnnonce }
})