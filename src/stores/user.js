import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from './url'
import {toRaw} from "vue";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
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
      let userInfos
      try{
        userInfos = await axios.get(url+'login/getuserinfos',{
          headers:{Authorization:"Bearer " + localStorage.getItem('token')}
        }).then((result) => {
          this.user = result.data
        })

        // Setting name in localStorage
        if(toRaw(this.user).professionnelAssocie == null)
          localStorage.setItem('name', toRaw(this.user).particulierAssocie.prenom)
        else
          localStorage.setItem('name', toRaw(this.user).professionnelAssocie.nomProfessionnel)

        if(toRaw(this.user).photoProfil.lienurl != null)
          localStorage.setItem('pfp', toRaw(this.user).photoProfil.lienurl)

      } catch (e) {
        console.log(e)
      }
      // return user
    }
  }
})
