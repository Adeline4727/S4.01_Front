
import { defineStore } from 'pinia';
import axios from 'axios';
import url from './url.js'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null
    }),
    actions: {
        async login(credentials) {
            try {
                const response = await axios.post(url + "", credentials);
                this.user = response.data.userDetails;
                this.token = response.data.token;
                localStorage.setItem('token', this.token);
                return response;
            } catch (error) {
                throw error;
            }
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
            this.user = null;
            this.token = null;
            localStorage.removeItem('token');
        }
    }
});