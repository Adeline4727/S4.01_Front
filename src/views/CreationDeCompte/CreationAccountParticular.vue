<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputText from '@/components/InputText.vue' 
// 1. On importe le store
import { useCompteUtilisateurStore } from '@/stores/CompteUtilisateur';

const router = useRouter()
// 2. On initialise le store
const store = useCompteUtilisateurStore()

let email = ref("")
let nom = ref("")
let prenom = ref("")
let sexe = ref("") 
let dateNaissance = ref("") 
let ville = ref("")
let nomRue = ref("") 
let codePostale = ref("") 
let secteurActivitee = ref("")
let numeroTel = ref("")
let modepasse = ref("") 

const gererInscription = async () => {
  // On prépare les données exactement comme avant
  const donneesInscription = {
    mail: email.value,                           
    motDePasse: modepasse.value,                 
    numeroTelephoneUtilisateur: numeroTel.value, 
    
    particulierAssocie: {
      nom: nom.value,
      prenom: prenom.value,
      civiliteAssocie: sexe.value, 
      dateNaissance: dateNaissance.value,
      utilisateurAssocie: {} 
    },
    adresseHabitee: {
      villeAdresse: ville.value,
      nomRue: nomRue.value,
      codePostal: codePostale.value 
    }
  };

  console.log("CE QUE J'ENVOIE AU STORE :", donneesInscription);

  try {
    // 3. ICI ON UTILISE LE STORE ! 
    // On appelle l'action de ton store en lui passant nos données
    await store.postNewCompteUtilisateur(donneesInscription);
    
    // Si l'action du store réussit (pas d'erreur déclenchée), on redirige
    router.push('/');
    
  } catch (erreur) {
    console.error("Erreur renvoyée par le store :", erreur);
    alert("Une erreur est survenue lors de l'envoi. Regarde la console (F12).");
  }
}
</script>

<template>
  <div class="page-layout">
    <div class="formulaire">
        <InputText v-model="email" nomInput="email">email</InputText>
        <InputText v-model="modepasse" nomInput="mot_de_passe" typeInput="password">mot de passe</InputText>

        <div>
          <input type="radio" id="homme" value="Monsieur" name="choixSexe" v-model="sexe" />
          <label for="homme">Homme</label>  

          <input type="radio" id="femme" value="Madame" name="choixSexe" v-model="sexe" />
          <label for="femme">Femme</label>
        </div>
        <InputText v-model="nom" nomInput="nom_societe">nom</InputText>
        <InputText v-model="prenom" nomInput="adresse">prenom</InputText>
        <InputText v-model="dateNaissance" nomInput="date_naissance" typeInput="date">date de naissance</InputText>
        
        <InputText v-model="nomRue" nomInput="nom_rue">nom de la rue</InputText>
        <InputText v-model="ville" nomInput="ville">ville</InputText>
        <InputText v-model="codePostale" nomInput="code_postale">code postale</InputText>
        
        <InputText v-model="secteurActivitee"  nomInput="secteur-activite">secteur d'activité</InputText>
        <InputText v-model="numeroTel"  nomInput="secteur-activite">numero de tel</InputText>
    </div>
  </div>
  
  <div class="colonne-gauche">
      <button class="boutton_Suivant" @click="gererInscription">suivant</button>
  </div> 

  <RouterView />
</template>

<style scoped>
/* Ton style reste identique */
.page-layout { padding: 50px; display: flex; flex-direction: column; align-items: center; }
.formulaire { display: flex; flex-direction: column; gap: 20px; border: 3px solid black; border-radius: 15px; padding: 40px; background-color: white; width: fit-content; }
.boutton_Suivant { display: inline-block; color: white; background-color: blue; border-radius: 5px; border: none; width: 180px; padding: 10px 0; text-align: center; margin-bottom: 30px; cursor: pointer; }
.colonne-gauche { position: absolute; padding-left: 47%; }
</style>