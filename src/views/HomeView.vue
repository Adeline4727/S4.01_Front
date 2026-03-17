<script setup>
import AnnonceCard from '@/components/AnnonceCard.vue';
import ButtonWithIcon from '@/components/ButtonWithIcon.vue';
import Carrousel from '@/components/Carrousel.vue';

</script>

<template>
    <div class="deposAnnonceElement">
        <h1>C'est le moment de vendre !</h1>
        <RouterLink to="/DeposAnnonce">
            <ButtonWithIcon icon="add-circle-outline"><b>Déposer une annonce</b></ButtonWithIcon>
        </RouterLink>
    </div>

    <section>
        <h2>En ce moment sur Leboncoin</h2>
        <article>
            <h3>Ventes immobilières</h3>
            <Carrousel>
                <AnnonceCard title="Annonce" category="Test" capacity="8" owner="Jean Dupont" price="42,00" city="74940 Annecy" publishDate="03/14/1592 6:53" />
                <AnnonceCard title="Annonce" category="Test" capacity="8" owner="Jean Dupont" price="42,00" city="74940 Annecy" publishDate="03/14/1592 6:53" />
                <AnnonceCard title="Annonce" category="Test" capacity="8" owner="Jean Dupont" price="42,00" city="74940 Annecy" publishDate="03/14/1592 6:53" />
                <AnnonceCard title="Annonce" category="Test" capacity="8" owner="Jean Dupont" price="42,00" city="74940 Annecy" publishDate="03/14/1592 6:53" />
                <AnnonceCard title="Annonce" category="Test" capacity="8" owner="Jean Dupont" price="42,00" city="74940 Annecy" publishDate="03/14/1592 6:53" />
                <AnnonceCard title="Annonce" category="Test" capacity="8" owner="Jean Dupont" price="42,00" city="74940 Annecy" publishDate="03/14/1592 6:53" />
                <AnnonceCard title="Annonce" category="Test" capacity="8" owner="Jean Dupont" price="42,00" city="74940 Annecy" publishDate="03/14/1592 6:53" />
                <AnnonceCard title="Annonce" category="Test" capacity="8" owner="Jean Dupont" price="42,00" city="74940 Annecy" publishDate="03/14/1592 6:53" />
            </Carrousel>
        </article>
    </section>
</template>


<style scoped>
    *{
        margin: 0;
        text-decoration: none;
    }
    .deposAnnonceElement{
        border-radius: 15px;
        width: 75%;
        padding: 10px;
        margin: 0 auto;
        margin-top: 50px;
        margin-bottom: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        
        background-image: url("public/background2.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
</style>
