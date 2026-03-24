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

    const sendMessage = async (user, text) => {
        console.log(text)
        if (!text) return;
        await connection.invoke("SendMessage", user, text);
    };

    const initSignalR = async () => {
        connection.off("ReceiveMessage");
        
        connection.on("ReceiveMessage", (user, text) => {
            messages.value.push({ user: user, message: text });
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