<script setup>
import ButtonSend from '@/components/ButtonSend.vue';
import Contact from '@/components/Contact.vue';
import InputText from '@/components/InputText.vue';
import Message from '@/components/Message.vue';
import MessageInput from '@/components/MessageInput.vue';

import { ref, onMounted, onUnmounted } from "vue";
import { useMessagesStore } from '@/stores/messages';

const store = useMessagesStore();

const user = "Bappou";
const currentText = ref("");

onMounted(async () => {
    await store.fetchMessages();
    await store.initSignalR();
});

onUnmounted(() => {
    store.stopSignalR();
});

const handleSend = async () => {
    if (!currentText.value.trim()) return;
    
    // Pour l'instant, mets des faux IDs existants dans ta base de données pour tester (ex: 1, 2, 3)
    const emetteurIdMock = 1; 
    const recepteurIdMock = 2; 
    const annonceIdMock = 3; 

    await store.sendMessage(emetteurIdMock, recepteurIdMock, annonceIdMock, currentText.value);
    currentText.value = "";
};
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
                <Message fromWho="Bappou">
                    <p>Merci poto</p>
                </Message>
                <Message v-for="(msg, index) in store.messages" :key="index" :fromWho="msg.emetteur?.pseudo || 'Moi'">
                    {{ msg.contenu }}
                </Message>
            </div>
            <div class="send-message-bar">
                <MessageInput v-model="currentText" @keyup.enter="handleSend" />
                <ButtonSend @click="handleSend" />
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