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

    return { annonces, annonce, getAnnonceById, fetchAnnonces }
})