<script setup>
import { useRoute } from 'vue-router'

</script>

<template>
    <div>
        <h1>Finaliser votre paiement</h1>
        <div class="space-between" id="conteneur">
            <div>
                <div class="contour">
                    <div>
                        <h2>Carte Bancaire</h2>
                        <p class="commentaire">Tous les champs sont obligatoires, sauf indication contraire.</p>
                    </div>
                    <div>
                        <label for="">Nom sur la carte</label>
                        <input type="text">
                    </div>
                    <div>
                        <label for="">Numéro de la carte</label>
                        <input type="text">
                    </div>
                    <div>
                        <div>
                            <label for="">Date d'expiration</label>
                            <input type="text">
                            <p>Recto de la carte au format MM/AA</p>
                        </div>
                        <div>
                            <label for="">Code de sécurité</label>
                            <input type="text">
                            <p>3 chiffres sur le verso de la carte</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button>
                    <div class="space-between">
                        <h2>Total</h2>
                        <p>[prix]</p>
                    </div>
                    <div>
                        <p>Détails du paiement \/</p>
                    </div>
                </button>
                <div>
                    <ul>
                        <li class="space-between">
                            <p>Votre paiement en ligne pour votre voyage</p>
                            <p>[prix]</p>
                        </li>
                        <li class="space-between">
                            <p>Frais de service</p>
                            <p>[prix]</p>
                        </li>
                        <li class="space-between">
                            <p>Taxe de séjour</p>
                            <p>[prix]</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.space-between{
    display: flex;
    justify-content: space-between;
}
#conteneur{
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    justify-content: center;
}
.commentaire{
    color: gray;
    font-style: italic;
    font-size: 15px;
}
.contour{
    border: solid darkorange 1px;
    border-radius: 20px;
    padding: 15px;
}
</style>