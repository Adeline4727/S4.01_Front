import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import axios from 'axios';

const url = "https://leboncoinapi-b0b2bmazh9ebdqef.switzerlandnorth-01.azurewebsites.net/api/Annonces/";

export const useAnnoncesStore = defineStore('annonces', () => {

const annonces = ref()
axios.get(url+"GetAnnonces").then( response => {
annonces.value = response.data
})

return {annonces}

})