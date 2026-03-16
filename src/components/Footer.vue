<script setup>
</script>

<template>
    <footer>
        <section>
            <h2>À propos de Leboncoin</h2>
            <ul>
                <li><a href="#">Plan du site</a></li>
                <li><a href="#">Qui sommes-nous ?</a></li>
                <li><a href="#">Nouveautés</a></li>
                <li><a href="#">Nous rejoindre</a></li>
                <li><a href="#">Nos engagements</a></li>
                <li><a href="#">Espace presse</a></li>
            </ul>
        </section>
        <section>
            <h2>Informations légales</h2>
            <ul>
                <li><a href="cgu">Conditions générales d'utilisation</a></li>
                <li><a href="#">Référencement et classement des annonces</a></li>
                <li><a href="cgv">Conditions générales de ventes</a></li>
                <li><a href="cookies">Politique de confidentialité</a></li>
                <li><a href="#">Gestion des cookies</a></li>
                <li><a href="#">Vos droits et obligations</a></li>
                <li><a href="#">Avis utilisateurs</a></li>
                <li><a href="#">Confiance et sécurité</a></li>
                <li><a href="#">Paiement en plusieurs fois</a></li>
            </ul>
        </section>
        <section>
            <h2>Des questions ?</h2>
            <ul>
                <li><a href="aide">Aide</a></li>
                <li><a href="#">La transaction sécurisée et la livraison</a></li>
                <li><a href="#">Le porte-monnaie</a></li>
                <li><a href="#">Le service de réservation de vacances en ligne pour les hôtes</a></li>
                <li><a href="#">Votre dossier de location en ligne</a></li>
                <li><a href="#">Votre Pass Locataire<sup>+</sup></a></li>
                <li><a href="#">Votre espace bailleur</a></li>
                <li><a href="#">Statut de nos services</a></li>
                <li><a href="#">Sécurité</a></li>
            </ul>
        </section>
        <section>
            <h2>Accessibilité</h2>
            <ul>
                <li><a href="accessibilite">Accessibilité : partiellement conforme</a></li>
                <li><a href="#">Paramètres d'accessibilité</a></li>
            </ul>
        </section>
    </footer>
</template>

<style scoped>
footer {
    background-color: #2A2F3A;
    color: white;
    margin: 0;
    padding: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: start;
}
footer h2 {
    text-transform: uppercase;
    font-size: 1.25rem;
    font-weight: 300;
    margin: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid white;
}
footer ul {
    margin: 0;
    padding: 0;
}
footer li {
    margin: 0;
    padding: 0.5rem;
    list-style: none;
}
footer a {
    color: white;
    text-decoration: none;
}
footer a:hover {
    text-decoration: underline;
}
</style>