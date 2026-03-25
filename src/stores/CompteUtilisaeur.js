import { defineStore } from 'pinia'
import axios from 'axios'

export const useCompteUtilisaeurStore = defineStore('compteUtilisaeur', {
  actions: {
    async sauvegarderUtilisateur(donnees) {
      try {
        // On utilise le proxy de Vite ici !
        const reponse = await axios.post('https://rowlet-village.fr/api/leboncoin/api/CompteUtilisateurs/PostCompteUtilisateur', donnees)
        
        console.log('Enregistrement réussi :', reponse.data)
        return reponse.data
        
      } catch (erreur) {
        console.error('Erreur lors de la sauvegarde :', erreur)
        throw erreur 
      }
    }
  }
})