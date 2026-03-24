<script setup>
import { ref } from 'vue';
import BouttonPlusMinus from './BouttonPlusMinus.vue';
const props = defineProps({
    annonce : {
        required : true,
    }
})
</script>

<template>
    <div>
        <h1>Votre réservation</h1>
        <p>Vous bénéficiez de la</p>
        <span style="box-sizing: border-box; display: inline-block; overflow: hidden; width: 239px; height: 24px; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative;">
            <img alt="Protection Voyageur" decoding="async" data-nimg="fixed" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: medium; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;" srcset="../../public/images/protection.svg 1x, ../../public/images/protection.svg 2x" src="../../public/images/protection.svg">
        </span>
    </div>
    <div class="trait"></div>
    <div>
        <h2>Vos dates de séjour</h2>
        <p>7 nuits à Arcachon</p>
        <div>
            <div>
                <p>Arrivée</p>
                <p></p>
            </div>
            <div>
                <p>Départ</p>
                <p></p>
            </div>
        </div>
    </div>
    <div class="trait"></div>
    <div>
        <h2>Nombre de voyageurs</h2>
        <div>
            <div>
                <p>Adulte</p>
                <p>18 ans et plus</p>
            </div>
            <div>
                <BouttonPlusMinus/>
            </div>
        </div>
        <div>
            <div>
                <p>Enfants</p>
                <p>De 3 à 17 ans</p>
            </div>
            <div>
                <BouttonPlusMinus/>
            </div>
        </div>
        <div>
            <div>
                <p>Bébés</p>
                <p>Moins de 3 ans</p>
            </div>
            <div>
                <BouttonPlusMinus/>
            </div>
        </div>
        <div>
            <div>
                <p>Animaux</p>
                <div>
                    <p>Acceptés</p>
                    <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_6n_" data-state="closed" data-spark-component="popover-trigger" aria-label="En savoir plus sur les animaux d’assistance"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-title="SvgQuestionOutline" fill="currentColor" class="fill-current shrink-0 text-current w-sz-16 h-sz-16 ml-sm" data-spark-component="icon" aria-hidden="true" focusable="false"><path d="M12 22C6.48333 22 2 17.5167 2 12C2 6.48333 6.48333 2 12 2C17.5167 2 22 6.48333 22 12C22 17.5167 17.5167 22 12 22ZM12 4C7.59167 4 4 7.59167 4 12C4 16.4083 7.59167 20 12 20C16.4083 20 20 16.4083 20 12C20 7.59167 16.4083 4 12 4Z"></path><path d="M12 14.3833C11.45 14.3833 11 13.9333 11 13.3833V12C11 11.45 11.45 11 12 11C12.2167 11 12.4167 10.9333 12.6 10.8167C12.775 10.7 12.9167 10.5333 13 10.3333C13.0833 10.1333 13.1 9.91667 13.0583 9.70833C13.0167 9.5 12.9167 9.30833 12.7667 9.15833C12.6167 9.00833 12.425 8.90833 12.2167 8.86667C12.0083 8.825 11.7917 8.85 11.5917 8.925C11.3917 9.00833 11.225 9.14167 11.1083 9.325C10.9917 9.5 10.925 9.70833 10.925 9.925C10.925 10.475 10.475 10.925 9.925 10.925C9.375 10.925 8.925 10.475 8.925 9.925C8.925 9.31667 9.10833 8.725 9.44167 8.21667C9.78333 7.70833 10.2583 7.31667 10.825 7.08333C11.3917 6.85 12 6.79167 12.6 6.90833C13.2 7.025 13.7417 7.31667 14.175 7.75C14.6083 8.18333 14.9 8.725 15.0167 9.325C15.1333 9.925 15.075 10.5417 14.8417 11.1C14.6083 11.6667 14.2167 12.1417 13.7083 12.4833C13.4833 12.6333 13.25 12.75 13 12.8333V13.3833C13 13.9333 12.55 14.3833 12 14.3833Z"></path><path d="M12 15.4583C11.7917 15.4583 11.5833 15.5167 11.4083 15.6333C11.2333 15.75 11.1 15.9167 11.0167 16.1083C10.9333 16.3 10.9167 16.5167 10.9583 16.725C11 16.9333 11.1 17.1167 11.25 17.2667C11.4 17.4167 11.5917 17.5167 11.7917 17.5583C12 17.6 12.2083 17.575 12.4083 17.5C12.6 17.4167 12.7667 17.2833 12.8833 17.1083C13 16.9333 13.0583 16.725 13.0583 16.5167C13.0583 16.2333 12.9417 15.9667 12.7417 15.7667C12.5417 15.5667 12.275 15.4583 11.9917 15.45L12 15.4583Z"></path></svg></button>
                </div>
            </div>
            <div>
                <BouttonPlusMinus/>
            </div>
        </div>
    </div>
    <div class="trait"></div>
    <div>
        <h2>Vos informations</h2>
        <p>* Champs obligatoires</p>
        <div>
            <div>
                <label for="">Prénom*</label>
                <input type="text">
            </div>
            <div>
                <label for="">Nom*</label>
                <input type="text">
            </div>
        </div>
        <div>
            <label for="">Numéro de téléphone</label>
            <input type="text">
            <p>Votre numéro de téléphone sera partagé à l’hôte une fois votre demande de réservation acceptée</p>
        </div>
    </div>
    <div class="trait"></div>
    <div>
        <h2>Envoyer un message à </h2>
        <div>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <div class="flex justify-end"><span class="ml-auto self-start"><span aria-hidden="true" data-spark-component="form-field-characters-count" class="text-caption text-neutral">0/2500</span></span></div>
        </div>
    </div>
    <div class="trait"></div>
    <div>
        <span style="box-sizing: border-box; display: inline-block; overflow: hidden; width: 239px; height: 24px; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative;">
            <img alt="Protection Voyageur" decoding="async" data-nimg="fixed" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: medium; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;" srcset="../../public/images/protection.svg 1x, ../../public/images/protection.svg 2x" src="../../public/images/protection.svg">
        </span>
    </div>
    <div class="trait"></div>
    <div>
        <button></button>
        <label data-spark-component="label" class="text-body-1 grow cursor-pointer" for=":form-field-_r_79_" id=":checkbox-_r_7c_">En validant, j’accepte les <a href="https://www.leboncoin.fr/dc/cgu" target="_blank" rel="noreferrer" class="font-bold underline" aria-label="Pour en savoir plus sur les CGU conditions générales d’utilisation">conditions d’utilisation</a> et les <a href="https://www.leboncoin.fr/dc/cgv" target="_blank" rel="noreferrer" class="font-bold underline" aria-label="Pour en savoir plus sur les CGV conditions générales de vente">CGV</a>, et certifie que mes prénoms et mon nom sont conformes à ceux de mon état civil.</label>
    </div>
    <div>
        <button></button>
    </div>
    <p class="text-caption text-on-background text-opacity-dim-1"><a target="_blank" href="/vacances/vos-droits-dopposition-dacces-et-de-rectification-sur-vos-donnees-collectees" class="font-bold underline">Me renseigner</a> sur les finalités du traitement de mes données personnelles, les destinataires, le responsable de traitement, les durées de conservation, les coordonnées du DPO et mes droits.</p>
</template>

<style scoped>

</style>