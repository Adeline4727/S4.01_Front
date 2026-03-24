<script setup>
import { ref } from 'vue';
const props = defineProps({
    annonce : {
        required : true,
    }
})
</script>

<template>
    <div>
        <div>
            <img src="" alt="">
        </div>
        <div>
            <h2></h2>
            <p></p>
            <p></p>
        </div>
    </div>
    <div class="trait"></div>
    <div>
        <div>
            <img src="" alt="">
            <div class="text-body-1 font-bold">Prudhomme Michel</div>
        </div>
    </div>
    <div class="trait"></div>
    <div>
        <h2>Récapitulatif du paiement</h2>
        <div>
            <div>
                <p>Montant de la location</p>
                <p></p>
            </div>
            <div>
                <p>Frais de service</p>
                <p></p>
            </div>
            <div>
                <p>Taxe de séjour</p>
                <p></p>
            </div>
        </div>
    </div>
    <div class="trait"></div>
    <div>
        <div>
            <div>
                <p>Total</p>
                <p></p>
            </div>
            <div>
                <p>À payer maintenant</p>
                <p></p>
            </div>
            <div>
                <p>Restera à payer sur place</p>
                <p></p>
            </div>
        </div>
        <p>Ce paiement nous sert à garantir votre réservation. Il inclut un acompte pour la location, les frais de service et la taxe de séjour. Retrouvez le détail de nos conditions d’annulation ici</p>
    </div>
</template>

<style scoped>
.trait{
    height: 1px;
    margin-top: 20px;
    margin-bottom: 20px;
    border: solid 1px gray;
}
</style>