<script setup>
import { ref } from 'vue';
import Button from '@/components/Button.vue';
import BouttonPlusMinus from './BouttonPlusMinus.vue';
const conditionsAcceptees = ref(false)
const messageTexte = ref('')
const maxCaracteres = 2500
const props = defineProps({
    annonce : {
        required : true,
    }
})
</script>

<template>
    <div class="PanneauReservationAnnonce">
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
            <p>[nombre nuit] nuits à {{ annonce.adresseBien.villeAdresse.nomVille }}</p>
            <div class="datesSejour">
                <div>
                    <p>Arrivée</p>
                    <p>[date et heure début]</p>
                </div>
                <div>
                    <p>Départ</p>
                    <p>[date et heure fin]</p>
                </div>
            </div>
        </div>
        <div class="trait"></div>
        <div>
            <h2>Nombre de voyageurs</h2>
            <div class="NbVoyageur">
                <div>
                    <p>Adulte</p>
                    <p class="commentaire">18 ans et plus</p>
                </div>
                <div>
                    <BouttonPlusMinus :min="1" />
                </div>
            </div>
            <div class="NbVoyageur">
                <div>
                    <p>Enfants</p>
                    <p class="commentaire">De 3 à 17 ans</p>
                </div>
                <div>
                    <BouttonPlusMinus/>
                </div>
            </div>
            <div class="NbVoyageur">
                <div>
                    <p>Bébés</p>
                    <p class="commentaire">Moins de 3 ans</p>
                </div>
                <div>
                    <BouttonPlusMinus/>
                </div>
            </div>
            <div class="NbVoyageur">
                <div>
                    <p>Animaux</p>
                    <div>
                        <p class="commentaire">Acceptés</p>
                        <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_6n_" data-state="closed" data-spark-component="popover-trigger" aria-label="En savoir plus sur les animaux d’assistance"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-title="SvgQuestionOutline" fill="currentColor" class="fill-current shrink-0 text-current w-sz-16 h-sz-16 ml-sm" data-spark-component="icon" aria-hidden="true" focusable="false"><path d="M12 22C6.48333 22 2 17.5167 2 12C2 6.48333 6.48333 2 12 2C17.5167 2 22 6.48333 22 12C22 17.5167 17.5167 22 12 22ZM12 4C7.59167 4 4 7.59167 4 12C4 16.4083 7.59167 20 12 20C16.4083 20 20 16.4083 20 12C20 7.59167 16.4083 4 12 4Z"></path><path d="M12 14.3833C11.45 14.3833 11 13.9333 11 13.3833V12C11 11.45 11.45 11 12 11C12.2167 11 12.4167 10.9333 12.6 10.8167C12.775 10.7 12.9167 10.5333 13 10.3333C13.0833 10.1333 13.1 9.91667 13.0583 9.70833C13.0167 9.5 12.9167 9.30833 12.7667 9.15833C12.6167 9.00833 12.425 8.90833 12.2167 8.86667C12.0083 8.825 11.7917 8.85 11.5917 8.925C11.3917 9.00833 11.225 9.14167 11.1083 9.325C10.9917 9.5 10.925 9.70833 10.925 9.925C10.925 10.475 10.475 10.925 9.925 10.925C9.375 10.925 8.925 10.475 8.925 9.925C8.925 9.31667 9.10833 8.725 9.44167 8.21667C9.78333 7.70833 10.2583 7.31667 10.825 7.08333C11.3917 6.85 12 6.79167 12.6 6.90833C13.2 7.025 13.7417 7.31667 14.175 7.75C14.6083 8.18333 14.9 8.725 15.0167 9.325C15.1333 9.925 15.075 10.5417 14.8417 11.1C14.6083 11.6667 14.2167 12.1417 13.7083 12.4833C13.4833 12.6333 13.25 12.75 13 12.8333V13.3833C13 13.9333 12.55 14.3833 12 14.3833Z"></path><path d="M12 15.4583C11.7917 15.4583 11.5833 15.5167 11.4083 15.6333C11.2333 15.75 11.1 15.9167 11.0167 16.1083C10.9333 16.3 10.9167 16.5167 10.9583 16.725C11 16.9333 11.1 17.1167 11.25 17.2667C11.4 17.4167 11.5917 17.5167 11.7917 17.5583C12 17.6 12.2083 17.575 12.4083 17.5C12.6 17.4167 12.7667 17.2833 12.8833 17.1083C13 16.9333 13.0583 16.725 13.0583 16.5167C13.0583 16.2333 12.9417 15.9667 12.7417 15.7667C12.5417 15.5667 12.275 15.4583 11.9917 15.45L12 15.4583Z"></path></svg></button>
                    </div>
                </div>
                <div>
                    <BouttonPlusMinus/>
                </div>
            </div>
        </div>
        <div class="trait"></div>
        <div class="section-informations">
            <h2>Vos informations</h2>
            <p class="commentaire-obligatoire">* Champs obligatoires</p>

            <div class="form-ligne">
            <div class="form-groupe">
                <label for="prenom">Prénom *</label>
                <input type="text" id="prenom" class="champ-texte">
            </div>
            
            <div class="form-groupe">
                <label for="nom">Nom *</label>
                <input type="text" id="nom" class="champ-texte">
            </div>
            </div>

            <div class="form-groupe">
            <label for="telephone">Numéro de téléphone</label>
            <input type="tel" id="telephone" class="champ-texte" value="0651075782">
            <p class="commentaire-info">Votre numéro de téléphone sera partagé à l’hôte une fois votre demande de réservation acceptée</p>
            </div>
        </div>
        <div class="trait"></div>
        <div class="section-message">
            <h2 class="titre-message">Envoyer un message à {{ annonce.proprietaireBien.particulierAssocie.nom }}</h2>
            
            <div class="conteneur-textarea">
            <textarea 
                v-model="messageTexte"
                class="champ-message" 
                placeholder="Dites quelques mots sur vous à votre hôte, votre heure d’arrivée et ce qui vous amène dans la région." 
                rows="5"
                :maxlength="maxCaracteres"
            ></textarea>
            
            <div class="compteur-caracteres">
                <span :class="{ 'limite-atteinte': messageTexte.length === maxCaracteres }">
                {{ messageTexte.length }}/{{ maxCaracteres }}
                </span>
            </div>
            </div>
        </div>
        <div class="trait"></div>
        <div>
            <span style="box-sizing: border-box; display: inline-block; overflow: hidden; width: 239px; height: 24px; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative;">
                <img alt="Protection Voyageur" decoding="async" data-nimg="fixed" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: medium; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;" srcset="../../public/images/protection.svg 1x, ../../public/images/protection.svg 2x" src="../../public/images/protection.svg">
            </span>
        </div>
        <p>Grâce au paiement en ligne, vous bénéficiez de la protection voyageur:</p>
        <ul class="liste-avantages">
            
            <li class="avantage-item">
            <svg class="avantage-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.2071 5.79289C20.5976 6.18342 20.5976 6.81658 20.2071 7.20711L10.2071 17.2071C9.81658 17.5976 9.18342 17.5976 8.79289 17.2071L3.79289 12.2071C3.40237 11.8166 3.40237 11.1834 3.79289 10.7929C4.18342 10.4024 4.81658 10.4024 5.20711 10.7929L9.5 15.0858L18.7929 5.79289C19.1834 5.40237 19.8166 5.40237 20.2071 5.79289Z"></path>
            </svg>
            <div class="avantage-texte">
                <span class="textBold">Annulez gratuitement</span>
                jusqu’à 30 jours avant le début du séjour
            </div>
            </li>

            <li class="avantage-item">
            <svg class="avantage-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.2071 5.79289C20.5976 6.18342 20.5976 6.81658 20.2071 7.20711L10.2071 17.2071C9.81658 17.5976 9.18342 17.5976 8.79289 17.2071L3.79289 12.2071C3.40237 11.8166 3.40237 11.1834 3.79289 10.7929C4.18342 10.4024 4.81658 10.4024 5.20711 10.7929L9.5 15.0858L18.7929 5.79289C19.1834 5.40237 19.8166 5.40237 20.2071 5.79289Z"></path>
            </svg>
            <div class="avantage-texte">
                <span class="textBold">Aucun montant</span> 
                n’est débité avant l’acceptation de la réservation
            </div>
            </li>

            <li class="avantage-item">
            <svg class="avantage-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.2071 5.79289C20.5976 6.18342 20.5976 6.81658 20.2071 7.20711L10.2071 17.2071C9.81658 17.5976 9.18342 17.5976 8.79289 17.2071L3.79289 12.2071C3.40237 11.8166 3.40237 11.1834 3.79289 10.7929C4.18342 10.4024 4.81658 10.4024 5.20711 10.7929L9.5 15.0858L18.7929 5.79289C19.1834 5.40237 19.8166 5.40237 20.2071 5.79289Z"></path>
            </svg>
            <div class="avantage-texte">
                <span class="textBold">Assurance incluse</span>
                en cas de problème à votre arrivée
            </div>
            </li>

        </ul>
        <div class="trait"></div>
        <div>
            <div class="checkbox-container">
                <input 
                type="checkbox" 
                id="cgu-checkbox" 
                v-model="conditionsAcceptees"
                class="checkbox-input">
                
                <label for="cgu-checkbox" class="checkbox-label">
                
                <span class="checkbox-custom">
                    <svg v-if="conditionsAcceptees" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </span>
                
                <span class="checkbox-texte">
                    En validant, j’accepte les <a href="#">conditions d’utilisation</a> et les <a href="#">CGV</a>, et certifie que mes prénoms et mon nom sont conformes à ceux de mon état civil.
                </span>
                
                </label>
            </div>
        </div>
        <div>
            <Button>Payer et valider ma réservation</Button>
        </div>
        <p class="texte-mentions-legales">
            <a target="_blank" href="/vacances/vos-droits-dopposition-dacces-et-de-rectification-sur-vos-donnees-collectees" class="lien-mentions-legales">
            Me renseigner
            </a>
            sur les finalités du traitement de mes données personnelles, les destinataires, le responsable de traitement, les durées de conservation, les coordonnées du DPO et mes droits.
        </p>
    </div>
</template>

<style scoped>
.PanneauReservationAnnonce{
    display: flex;
    flex-direction: column;
}
.trait{
    height: 1px;
    margin-top: 20px;
    margin-bottom: 20px;
    border: solid 1px gray;
}
h2{
    font-size: 20px;
}
.datesSejour{
    display: flex;
    justify-content: space-between;
}
.NbVoyageur{
    display: flex;
    justify-content: space-between;
    margin: 10px auto;
}
.commentaire{
    color: gray;
    font-style: italic;
    font-size: 15px;
}
.message{
    padding: 15px;
}
.textBold{
    font-weight: bold;
    color: #0f172a;
}
.checkbox-container {
  margin-top: 20px;
  margin-bottom: 20px;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
}

.checkbox-custom {
  width: 24px;
  height: 24px;
  border: 2px solid #cbd5e1;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
  background-color: transparent;
}

.checkbox-input:checked + .checkbox-label .checkbox-custom {
  background-color: #005fcc;
  border-color: #005fcc;
  color: white;
}

.checkbox-label:hover .checkbox-custom {
  border-color: #94a3b8;
}
.checkbox-input:checked + .checkbox-label:hover .checkbox-custom {
  background-color: #004ba6;
}

.checkbox-custom svg {
  width: 14px;
  height: 14px;
}

.checkbox-texte {
  font-size: 0.9rem;
  color: #334155;
  line-height: 1.5;
}

.checkbox-texte a {
  color: inherit;
  font-weight: bold;
  text-decoration: underline;
}

.liste-avantages {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.avantage-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.avantage-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  fill: currentColor;
  margin-top: 2px;
}

.avantage-texte {
  font-size: 1rem;
  color: #334155;
  line-height: 1.5;
}

.texte-mentions-legales {
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.5;
  margin-top: 16px;
}

.lien-mentions-legales {
  font-weight: 700;
  text-decoration: underline;
  color: inherit;
  transition: color 0.2s ease;
}

.lien-mentions-legales:hover {
  color: #0f172a;
}

.section-message {
  margin-top: 24px;
  margin-bottom: 24px;
}

.titre-message {
  font-size: 1.25rem;
  margin-bottom: 16px;
}

.conteneur-textarea {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.champ-message {
  width: 100%;
  padding: 16px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  color: #0f172a;
  resize: vertical;
  min-height: 120px;
  outline: none;
  transition: border-color 0.2s ease;
}

.champ-message:focus {
  border-color: #0f172a;
}

.compteur-caracteres {
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  color: #64748b;
}

.limite-atteinte {
  color: #ef4444; 
  font-weight: bold;
}

.section-informations {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #0f172a;
}

.form-ligne {
  display: flex;
  gap: 16px;
  width: 100%;
}

.form-groupe {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.commentaire-obligatoire, 
.commentaire-info {
  font-size: 0.8rem;
  color: #64748b;
  margin: 0;
}

label {
  font-size: 0.95rem;
  color: #334155;
}

.champ-texte {
  width: 100%;
  height: 44px;
  padding: 0 16px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  font-size: 1rem;
  color: #0f172a;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s ease;
}

.champ-texte:focus {
  border-color: #0f172a;
}
</style>