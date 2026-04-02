import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import axios from 'axios';

const url = "https://rowlet-village.fr/api/leboncoin/api/TypeHebergements/";

export const useTypeHebergementsStore = defineStore('typeHbergements', () => {
    const typehebergements = ref([])
    const typehebergement = ref(null)

    const fetchTypeHebergements = () => {
        axios.get(url + "GetTypeHebergements").then(response => {
            typehebergements.value = response.data
        })
    }

    const getTypeHebergementById = (id) => {
        axios.get(url + "GetTypeHebergementById?id=" + id).then(response => {
            typehebergement.value = response.data
        })
    }

    

    return { typehebergements, typehebergement, getTypeHebergementById, fetchTypeHebergements }
})