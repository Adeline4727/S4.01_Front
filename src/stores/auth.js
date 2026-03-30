
import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from './url.js'
import {useUserStore} from "@/stores/user.js";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null
    }),
    getters:{
        isConnected: (state) => !!state.token,
    },
    actions: {
        async doesMailExists(mail) {
            let response

            if(mail.value === "")
                return false

            try {
                response = await axios.get(
                    url + "compteutilisateurs/getcompteutilisateurexistence?mail=" + mail.value.replaceAll("\@", "%40"),
                    { validateStatus: (_) => true }
                )
            } catch (e) {
                console.log(e)
            }

            return response.data
        },
        async login(credentials) {
            let response, isConnected

            try {
                response = await axios.post(
                    url + "Login/Login",
                    credentials,
                    { validateStatus: (_) => true }
                )

                if(response.status !== 200)
                    isConnected = false
                else {
                    isConnected = true
                    localStorage.setItem('token', response.data.token)

                    const userStore = useUserStore()
                    let userData = await userStore.getUserInfos()

                    // Setting name in localStorage
                    // if(userData.data.professionnelAssocie == null)
                    //     localStorage.setItem('name', userData.data.particulierAssocie.prenom)
                    // else
                    //     localStorage.setItem('name', userData.data.professionnelAssocie.nomProfessionnel)
                    //
                    // if(userData.data.photoProfil.lienurl != null) {
                    //     console.log("pfp set")
                    //     localStorage.setItem('pfp', userData.data.photoProfil.lienurl)
                    //     console.log(localStorage.getItem('pfp'))
                    // }
                }
            } catch (e) {
                console.log(e)
            }
            return isConnected

        },
        // async register(userData) {
        //     try {
        //         const response = await axios.post('http://localhost:3001/register', userData);
        //         this.user = response.data.userDetails;
        //         this.token = response.data.token;
        //         localStorage.setItem('token', this.token);
        //         return response;
        //     } catch (error) {
        //         throw error;
        //     }
        // },
        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            localStorage.removeItem('pfp')
        }
    }
});