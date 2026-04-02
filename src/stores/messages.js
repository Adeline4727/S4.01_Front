import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { url } from './url';
import * as signalR from "@microsoft/signalr";

const hubUrl = "https://rowlet-village.fr/api/leboncoin/chat-hub/";
const connection = new signalR.HubConnectionBuilder()
    .withUrl(hubUrl)
    .withAutomaticReconnect()
    .build();

export const useMessagesStore = defineStore('messages', () => {
    const messages = ref([]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(url + "messages/" + "GetMessages");
            messages.value = response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des messages:", error);
        }
    };

    const getMessagesById = computed(() => {
        return (id) => messages.value.find(m => m.messageId == id);
    });

    const sendMessage = async (emetteurId, recepteurId, annonceId, text) => {
        if (!text) return;

        // 1. On prépare l'objet selon ton modèle C#
        const nouveauMessage = {
            contenu: text,
            dateEnvoi: new Date().toISOString(),
            // /!\ Il faudra utiliser les vrais noms de tes clés étrangères générées par EF Core
            // Si tu as des doutes, regarde ton schéma de base de données.
            emetteurId: emetteurId, 
            recepteurId: recepteurId,
            annonceConcerneeId: annonceId
        };

        try {
            // 2. On sauvegarde en base de données via ton API REST existante
            const response = await axios.post(url + "messages/PostMessage", nouveauMessage);
            
            // 3. On diffuse le message validé (avec son ID généré) via SignalR
            // On envoie le JSON retourné par l'API
            await connection.invoke("SendMessage", response.data); 
        } catch (error) {
            console.error("Erreur lors de l'envoi du message :", error);
        }
    };

    const initSignalR = async () => {
        connection.off("ReceiveMessage");
        
        // On reçoit maintenant un objet "Message" complet
        connection.on("ReceiveMessage", (nouveauMessage) => {
            messages.value.push(nouveauMessage);
        });

        if (connection.state === signalR.HubConnectionState.Disconnected) {
            await connection.start();
            console.log("SignalR connecté !");
        }
    };

    const stopSignalR = async () => {
        if (connection.state === signalR.HubConnectionState.Connected) {
            await connection.stop();
            console.log("SignalR déconnecté.");
        }
    };

    return { 
        messages, 
        fetchMessages, 
        getMessagesById, 
        sendMessage, 
        initSignalR, 
        stopSignalR 
    };
});