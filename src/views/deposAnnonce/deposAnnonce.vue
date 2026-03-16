<script setup>
import Button from '@/components/Button.vue';
import { ref } from 'vue'
const isLogin = ref(true)
const step = ref(1)
import { RouterLink, RouterView } from 'vue-router'

const types = [

    {name:"maison"},
    {name:"appartement"},
    {name:"Autres"},

]

</script>

<template>
    <form id="depos-annonce-form">
        <div v-if="step == 1">
            <h1>Commençons par l'essentiel !</h1>
            <p>* champs obligatoire</p>
            <div class="input-group">
              <label>Quel est le titre de l'annonce</label>
              <input class="input-element"/>
            </div>
            <Button @click="step+=1">Continuer</Button>
        </div>
        <div v-else-if="step == 2">
            <h1>Où se situe votre bien ?</h1>
            <input class="input-element"/>
            <Button @click="step-=1">Retour</Button>
            <Button @click="step+=1">Continuer</Button>
        </div>
        <div v-else-if="step == 3">
            <h1>Ajoutez des photos</h1>
            <input id="file-upload" type="file" accept="image/*" multiple @change="handleFileUpload" />
            <Button @click="step-=1">Retour</Button>
            <Button @click="step+=1">Continuer</Button>
        </div>
        <div v-else-if="step == 4">
            <h1>Dites-nous en plus</h1>
            <p>Choisissez votre type de bien*</p>
            <div v-for="type in types">
                <input type="radio" name="type" :id="type.name">
                <label :for="type.name">{{type.name}}</label>
            </div>
            <div>
                <h3>Les critères indispensables</h3>
                <div>
                    <div class="input-group">
                        <label>Surface habitable *</label>
                        <input class="input-element"/>
                        <p>Comptez les surfaces intérieures habitables d'une hauteur sous plafond de plus de 1,80m.</p>
                    </div>
                    <div class="input-group">
                        <label>Capacité</label>
                        <input class="input-element"/> 
                    </div>
                    <div class="input-group">
                        <label>Nombre de chambres</label>
                        <input class="input-element"/>
                    </div>
                    <div class="input-group">
                        <label>Horaire d'arrivée</label>
                        <input class="input-element"/>
                    </div>
                    <div class="input-group">
                        <label>Horaire de départ</label>
                        <input class="input-element"/>
                    </div>
                    <div class="input-group">
                        <label>Equipements</label>
                        <input class="input-element"/>
                    </div>
                    <div class="input-group">
                        <label>Services</label>
                        <input class="input-element"/>
                    </div>
                    <div class="input-group">
                        <label>Animaux acceptés</label>
                        <input class="input-element"/>
                    </div>
                    <div class="input-group">
                        <label>Fumeurs acceptés</label>
                        <input class="input-element"/>
                    </div>
                </div>
            </div>
            <Button @click="step-=1">Retour</Button>
            <Button @click="step+=1">Continuer</Button>
        </div>
        <div v-else-if="step == 5">
            <h3>Description de l'annonce *</h3>
            <input class="input-element"/>
            <p>Vérifiez que le bien que vous proposez n'est pas dans une ville qui réglemente les locations de vacances. Si c'est le cas, vous devez désormais vous enregistrer sur le site de votre mairie. </p>
            <Button @click="step-=1">Retour</Button>
            <Button @click="step+=1">Continuer</Button>
        </div>
        <div v-else-if="step == 6">
            <h1>Quel est votre prix ?</h1>
            <div class="input-group">
                <label>Prix minimum à la nuit*</label>
                <input class="input-element"/>
            </div>
            <Button @click="step-=1">Retour</Button>
            <Button @click="step+=1">Publiez l'annonce</Button>
        </div>
    </form>
</template>

<style scoped>
    #depos-annonce-form{
        justify-content: center;
        margin-top: 10vh;
        font-family: sans-serif;
        text-align: center;
        width: 100%;
        text-align: center;
    }
    .input-group {
        align-items: center;
        justify-content: space-between;
    }
    .input-element{
        margin: 5px;
    }
</style>