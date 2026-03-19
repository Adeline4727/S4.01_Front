import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import axios from 'axios';

const url = "https://leboncoinapi-b0b2bmazh9ebdqef.switzerlandnorth-01.azurewebsites.net/api/Annonces/";

export const useAnnoncesStore = defineStore('annonces', () => {
    const annonces = ref([])

    const fetchAnnonces = () => {
        axios.get(url + "GetAnnonces").then(response => {
            annonces.value = response.data
        })
    }

    const getAnnonceById = computed(() => {
        return (id) => annonces.value.find(a => a.annonceId === Number(id))
    })

    return { annonces, getAnnonceById, fetchAnnonces }
})