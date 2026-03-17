<script setup>
import Contact from '@/components/Contact.vue';
import Message from '@/components/Message.vue';

</script>
<template>
    <section class="messagerie">
        <article class="contacts">
            <Contact annonce="Joy-Con Nintendo S..." utilisateur="BrindibouDu36" lastMessage="Oh" lastMessageDate="Aujourd'hui à 16:48" isActive />
            <Contact annonce="Joy-Con Nintendo S..." utilisateur="BrindibouDu36" lastMessage="Oh" lastMessageDate="Aujourd'hui à 16:48" />
            <Contact annonce="Joy-Con Nintendo S..." utilisateur="BrindibouDu36" lastMessage="Oh" lastMessageDate="Aujourd'hui à 16:48" />
            <Contact annonce="Joy-Con Nintendo S..." utilisateur="BrindibouDu36" lastMessage="Oh" lastMessageDate="Aujourd'hui à 16:48" />
            <Contact annonce="Joy-Con Nintendo S..." utilisateur="BrindibouDu36" lastMessage="Oh" lastMessageDate="Aujourd'hui à 16:48" />
            <Contact annonce="Joy-Con Nintendo S..." utilisateur="BrindibouDu36" lastMessage="Oh" lastMessageDate="Aujourd'hui à 16:48" />
        </article>
        <article class="message-ui">
            <Message>
                <h3>Votre colis est prêt !</h3>
                <p>
                    Lorem...
                </p>
            </Message>
        </article>
    </section>
</template>
<style scoped>
    .messagerie {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 0.5rem;
    }

    .messagerie .contacts {
        height: 75vh;
        overflow-y: scroll;
    }
</style>