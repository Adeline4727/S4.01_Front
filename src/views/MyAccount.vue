<script setup>
import AccountActionListElement from '@/components/AccountActionListElement.vue';
import AccountActionListWithIcon from '@/components/AccountActionListWithIcon.vue';
import AccountActionWithIcon from '@/components/AccountActionWithIcon.vue';
import ButtonWithIcon from '@/components/ButtonWithIcon.vue';
import FieldInput from '@/components/FieldInput.vue';
const hasPhoto = false;
</script>
<template>
    <section class="mes-infos">
        <div class="infos-compte">
            <div>
                <span class="profile-pic">
                    <img v-if="hasPhoto" src="" alt="">
                    <span v-else>B</span>
                    <button class="add-btn">+</button>
                </span>
                <span class="name">
                    <RouterLink to="#">Baptiste Poupeau</RouterLink>
                    <!-- <FieldInput name="pseudo" label="Votre nom" required="true" /> -->
                </span>
            </div>
            <span>
                <ButtonWithIcon icon="create-outline">Modifier</ButtonWithIcon>
            </span>
        </div>
        <div class="solde">
            <h3>Porte-monnaie</h3>
            <strong>0,00 €</strong>
            <span>Solde disponible</span>
        </div>
    </section>
    <section class="mes-activites">
        <h3>Mes activités</h3>
        <div class="list-actions">
            <AccountActionWithIcon label="Annonces" description="Gérer mes annonces déposées" icon="list-outline" target="#" />
            <AccountActionWithIcon label="Transactions" description="Suivre mes achats et mes ventes" icon="cash-outline" target="#" />
        </div>
    </section>
    <section class="mes-projets">
        <h3>Mes projets</h3>
        <div class="list-actions">
            <AccountActionListWithIcon label="Immobilier" icon="home-outline">
                <AccountActionListElement label="Espace locataire" description="Créer et gérer mon dossier locataire" />
                <AccountActionListElement label="Espace propriétaire" description="Gérer la mise en location de mon bien" />
            </AccountActionListWithIcon>
            <AccountActionListWithIcon label="Vacances" icon="sunny-outline">
                <AccountActionListElement label="Espace hôte" description="Louer un logement de vacances" />
                <AccountActionListElement label="Espace voyageur" description="Réserver un logement de vacances" />
            </AccountActionListWithIcon>
        </div>
    </section>
    <section class="mon-compte">
        <h3>Mon compte</h3>
        <div class="list-actions">
            <AccountActionWithIcon label="Mes paramètres" icon="settings-outline" target="#" />
            <AccountActionWithIcon label="Connexion et sécurité" icon="shield-checkmark-outline" target="#" />
            <AccountActionWithIcon label="Factures" icon="document-text-outline" target="#" />
        </div>
        <button class="logout-btn">Me déconnecter</button>
    </section>
</template>
<style scoped>
    * {
        font-family: sans-serif;
    }

    section {
        margin: 3rem 10%;
    }

    template > section:first-child {
        margin-top: 2rem;
    }

    section > h3 {
        font-size: 1rem;
        margin-top: 2rem;
        color: dimgray;
    }

    .list-actions {
        width: 100%;
        display: flex;
        gap: 1rem;
    }

    .mes-infos {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 3.5rem;
    }

    @media screen and (max-width: 768px) {
        .mes-infos {
            display: grid;
            grid-template-columns: 1fr;
        }
        .mes-infos > div {
            width: 92.5%;
        }
        .infos-compte > div {
            padding-right: 0;
        }
    }

    .infos-compte, .infos-compte > div {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .mes-infos > div {
        border-radius: 1rem;
        padding: 1rem;
        box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.33);
    }

    .profile-pic {
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        background-color: darkgreen;
        color: white;
        position: relative;
        text-align: center;
        /* box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.33); */
    }


    .profile-pic > span {
        display: block;
        font-size: 2rem;
        width: 6rem;
        margin-top: 30%;
    }

    .add-btn {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 1.75rem;
        height: 1.75rem;
        font-size: 1.25rem;
        border-radius: 50%;
        border: none;
        outline: none;
        box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.33);
        background-color: white;
        cursor: pointer;
    }

    .add-btn:hover {
        background-color: whitesmoke;
    }

    .name {
        font-size: 1.5rem;
        font-family: sans-serif;
        font-weight: bold;
    }

    .name a {
        text-decoration: none;
        color: black;
    }

    .button-with-icon {
        min-width: unset;
        font-weight: bold;
    }

    .solde {
        padding: 0.5rem 1rem;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: space-around;
    }

    .solde h3 {
        margin: 0;
        padding: 0;
    }

    .solde strong {
        font-size: 1.5rem;
    }

    .logout-btn {
        margin-top: 1.5rem;
        font-size: 1rem;
        font-weight: bold;
        background-color: white;
        color: darkslateblue;
        border: 1px solid darkslateblue;
        border-radius: 1rem;
        outline: none;
        padding: 1rem 2rem;
        cursor: pointer;
    }
    .logout-btn:hover {
        background-color: rgba(72, 61, 139, 0.1);
    }
</style>