<script setup>
import ButtonSend from '@/components/ButtonSend.vue';
import Contact from '@/components/Contact.vue';
import InputText from '@/components/InputText.vue';
import Message from '@/components/Message.vue';
import MessageInput from '@/components/MessageInput.vue';

import { ref, onMounted, onUnmounted } from "vue";
import * as signalR from "@microsoft/signalr";

const url = "https://rowlet-village.fr/api/leboncoin/api/chat-hub";
const connection = new signalR.HubConnectionBuilder()
    .withUrl(url)
    .withAutomaticReconnect()
    .build();

const messages = ref([]);
const message = ref("");

const user = "Bappou"

const sendMessage = async () => {
    if (!message.value) return;

    await connection.invoke("SendMessage", user, message.value);
    message.value = "";
};

onMounted(async () => {
    connection.on("ReceiveMessage", (user, message) => {
        messages.value.push({ user, message });
    });

    await connection.start();
});

onUnmounted(() => {
    connection.stop();
});
</script>
<template>
    <section class="messagerie">
        <article class="contacts">
            <Contact annonce="Joy-Con Nintendo S..." utilisateur="BrindibouDu38" lastMessage="Oh" lastMessageDate="Auj. à 16:48" isActive="true" />
            <Contact annonce="Joy-Con Nintendo S..." utilisateur="BrindibouDu38" lastMessage="Oh" lastMessageDate="Auj. à 16:48" />
            <Contact annonce="Joy-Con Nintendo S..." utilisateur="BrindibouDu38" lastMessage="Oh" lastMessageDate="Auj. à 16:48" />
            <Contact annonce="Joy-Con Nintendo S..." utilisateur="BrindibouDu38" lastMessage="Oh" lastMessageDate="Auj. à 16:48" />
            <Contact annonce="Joy-Con Nintendo S..." utilisateur="BrindibouDu38" lastMessage="Oh" lastMessageDate="Auj. à 16:48" />
            <Contact annonce="Joy-Con Nintendo S..." utilisateur="BrindibouDu38" lastMessage="Oh" lastMessageDate="Auj. à 16:48" />
        </article>
        <article class="message-ui">
            <div class="messages">
                <Message fromWho="BrindibouDu38">
                    <h3>Votre colis est prêt !</h3>
                    <p>
                        Lorem...
                    </p>
                </Message>
                <Message fromWho="Bappou" me="true">
                    <p>Merci poto</p>
                </Message>
                <Message v-for="(msg, index) in messages" :key="index" :fromWho="user" />
            </div>
            <div class="send-message-bar">
                <MessageInput :v-model="message" />
                <ButtonSend @click="sendMessage" />
            </div>
        </article>
        <article class="annonce-resume">
            <span class="wip">WIP</span>
        </article>
    </section>
</template>
<style scoped>
    .messagerie {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        gap: 0.5rem;
        margin: 1rem 10%;
    }

    .messagerie .contacts {
        height: 75vh;
        overflow-y: scroll;
    }

    .message-ui {
        display: flex;
        flex-direction: column;
        justify-content: end;
        gap: 1rem;
        width: 100%;
    }

    .messages {
        overflow-y: scroll;
        max-height: 60vh;
    }

    .wip {
        padding: 0.125rem 0.5rem;
        background-color: gold;
        border-radius: 1rem;
    }

    .send-message-bar {
        display: flex;
        gap: 3rem;
        align-items: center;
    }

    .message-input {
        width: 100%;
    }
</style>