import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from './url'

export const useUserStore = defineStore('compteUtilisaeur', {
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
    },
    async getUserInfos(){
      let user
      try{
        user = await axios.get(url+'login/getuserinfos',{ 
          headers:{Authorization:"Bearer " + localStorage.getItem('token')}
        })
      } catch (e) {
        console.log(e)
      }

      return user
    }
  }
})