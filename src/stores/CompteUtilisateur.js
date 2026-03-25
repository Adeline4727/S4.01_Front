import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

// 1. On remet l'URL du proxy pour éviter l'erreur CORS rouge !
const url = "/mon-api/api/leboncoin/api/CompteUtilisateurs/";

// 2. On donne un VRAI nom au store ('compteUtilisateur')
export const useCompteUtilisateurStore = defineStore('compteUtilisateur', () => {
    
    // (Je te laisse ces variables au cas où tu en aurais besoin plus tard)
    const annonces = ref([])
    const annonce = ref(null)

    // 3. On ajoute 'async' et 'await' pour que le code attende la réponse du serveur
    const postNewCompteUtilisateur = async (nouveaucompte) => {
        try {
            const rep = await axios.post(url + "PostCompteUtilisateur", nouveaucompte);
            return rep.data;
        } catch (error) {
            console.error("Erreur API dans le store:", error);
            throw error; // Renvoie l'erreur au composant pour afficher l'alerte
        }
    }

    // 4. ON EXPORTE SEULEMENT CE QUI EXISTE VRAIMENT ! (Fini le fetchAnnonces)
    return { 
        annonces, 
        annonce, 
        postNewCompteUtilisateur 
    }
})