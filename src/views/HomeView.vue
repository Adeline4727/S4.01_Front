<script setup>
import ButtonWithIcon from '@/components/ButtonWithIcon.vue';
import Carrousel from '@/components/Carrousel.vue';


</script>

<template>
    <div>
        <h1>C'est le moment de vendre !</h1>
        <ButtonWithIcon icon="add-circle-outline">Déposer une annonce</ButtonWithIcon>
    </div>

    <section>
        <Carrousel />
    </section>
</template>


<style scoped>
    h1{color: lime}
</style>
