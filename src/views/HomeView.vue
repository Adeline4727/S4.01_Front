<script setup>
import AnnonceCard from '@/components/AnnonceCard.vue';
import ButtonWithIcon from '@/components/ButtonWithIcon.vue';
import Carrousel from '@/components/Carrousel.vue';

</script>

<template>
    <div>
        <h1>C'est le moment de vendre !</h1>
        <ButtonWithIcon icon="add-circle-outline">Déposer une annonce</ButtonWithIcon>
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
</style>
