import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import axios from 'axios';

const url = "https://rowlet-village.fr/api/leboncoin/api/Services/";

export const useServicesStore = defineStore('Services', () => {
    const Services = ref([])
    const Service = ref(null)

    const fetchServices = () => {
        axios.get(url + "GetServices")
            .then(response => {
                console.log("Données API reçues :", response.data);
                Services.value = response.data.$values || response.data;
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des Services :", error);
        });
    }

    const getServiceById = (id) => {
        axios.get(url + "GetServiceById?id=" + id).then(response => {
            Service.value = response.data
        })
    }

    const postService = async (newService) => {
        try {
            const response = await axios.post(url+"PostService", newService);
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

    return { Services, Service, getServiceById, fetchServices, postService }
})