import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import axios from 'axios';

const url = "https://rowlet-village.fr/api/leboncoin/api/chat-hub/";
const connection = new signalR.HubConnectionBuilder()
    .withUrl(url)
    .withAutomaticReconnect()
    .build();

export const useMessagesStore = defineStore('messages', () => {
    const messages = ref([])

    const fetchMessages = () => {
        axios.get(url + "GetMessages").then(response => {
            messages.value = response.data
        })
    }

    const getMessagesById = computed(() => {
        return (id) => messages.value.find(m => m.messageId == id)
    })

    const sendMessage = async (user, message) => {
        if (!message.value) return;
    
        await connection.invoke("SendMessage", user, message);
        message.value = "";
    };

    return { messages, getMessagesById, fetchMessages, sendMessage }
})