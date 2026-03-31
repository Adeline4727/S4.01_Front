<script setup>
import Button from '@/components/Button.vue';
import Dropdown from '@/components/Dropdown.vue'
import FieldInput from '@/components/FieldInput.vue';
import FieldInputWithUnit from '@/components/FieldInputWithUnit.vue';
import MapComponent from '@/components/MapComponent.vue';
import { ref, onMounted, computed } from 'vue'
import { useAnnoncesStore } from '@/stores/annonces';
import { useTypeEquipementsStore } from '@/stores/typeequipements';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { RouterLink, RouterView } from 'vue-router'
import ActionDropdownWithIcon from '@/components/ActionDropdownWithIcon.vue';

const route = useRoute();
const router = useRouter();
const annonceStore = useAnnoncesStore();
const typeEquipementStore = useTypeEquipementsStore();
const isLoggedIn = ref(true);
const surfaceHabitable = ref(0);
const step = ref(1)
const latitudeTest  = ref(45.8992)
const longitudeTest = ref(6.1293)

const newAnnonce = ref({
  "titreAnnonce": "Superbe appartement à Annecy",
  "descriptionAnnonce": "Très bel appartement avec vue sur le lac.",
  "nbChambre": 2,
  "capacitePersonne": 4,
  "capaciteAnimal": 0,
  "capaciteBebe": 1,
  "active": true,
  "estGarantie": true,
  "minmumNuite": 2,
  "prix": 85.50,
  "etoileBien": 4,
  "pourcentagePayeDirectement": 10,

  // --- RELATIONS COMPLEXES (C'est souvent ici que ça casse) ---

  // ADRESSE : Entity Framework n'aime pas les "string" générés par Swagger.
  "adresseBien": {
    "nomRue": "Rue de l'Arc-en-Ciel",
    "voie": 9,
    "longitude": 6.1293,
    "latitude": 45.8992,
    "villeAdresse": {
      "codeInsee": "74011",
      "nomVille": "Annecy",
      "codePostalVille": "74940",
      "taxeSejour": 1.5,
      "departementAssocie": null
    }
  },

  "conditionHebergementBien": {
    "heureDepart": "10:00:00",
    "heureArrivee": "16:00:00",
    "animauxAcceptes": false,
    "fumeur": false
  },

  "typeHebergementBien": {
    "typeHebergementId": 1,
    "libelleTypeHebergement": "Appartement"
  },

  "datePublication": null, 
  "natureHebergementBien": null,
  "statutAnnonceAssocie": null,
  "proprietaireBien": null,
  
  "avis": [],
  "messages": [],
  "photos": [],
  "recherchesEffectuees": [],
  "reservations": [],
  "equipementsInclus": [],
  "servicesProposes": [],
  "utilisateursInteresses": [],
  "joursSemaine": [],
  "typesPaiement": [],
  "exterieurs": []
});

onMounted(() => {   
    typeEquipementStore.fetchTypeEquipements();
})

const tousLesEquipements = computed(() => typeEquipementStore.TypeEquipements)
const equipementsSelectionnes = ref([])

const tousLesServices = ['Ménage quotidien', 'Petit-déjeuner', 'Navette aéroport', 'Garde d\'enfants']
const servicesSelectionnes = ref([]) // Le tableau qui va se remplir

// Fonctions pour supprimer un élément de la liste
const retirerEquipement = (item) => {
    equipementsSelectionnes.value = equipementsSelectionnes.value.filter(e => e !== item)
}

const retirerService = (item) => {
    servicesSelectionnes.value = servicesSelectionnes.value.filter(s => s !== item)
}

const types = [

    {name:"Maison"},
    {name:"Appartement"},
    {name:"Autres"},

]

const photosPreview = ref([]);

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  
  files.forEach(file => {
    const photoObject = {
      file: file,
      url: URL.createObjectURL(file) 
    }
    newAnnonce.value.photos.push(photoObject)
  })
}

const removePhoto = (index) => {

  URL.revokeObjectURL(newAnnonce.photos[index].url)
  newAnnonce.value.photos.splice(index, 1)
}

const query = ref('')
const suggestions = ref([]) 
const selectedAddress = ref(null)

let timer = null
const searchAddress = async () => {
    clearTimeout(timer)
    timer = setTimeout(async () => {

    if (query.value.length < 3) {
        suggestions.value = []
        return
    }

    try {
        const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query.value)}&limit=5&autocomplete=1`
        )
        const data = await response.json()
        suggestions.value = data.features;
    } catch (error) {
        console.error("Erreur API Adresse :", error)
    }
  }, 300)
}

const selectSuggestion = (suggestion) => {
    query.value = suggestion.properties.label;
    selectedAddress.value = suggestion;
    longitudeTest.value = suggestion.geometry.coordinates[0];
    latitudeTest.value = suggestion.geometry.coordinates[1];
    suggestions.value = [];

    const props = suggestion.properties;
  
    newAnnonce.value.adresseBien = {
        adresseId: 0,
        nomRue: props.street || props.name || "",
        voie: props.housenumber ? parseInt(props.housenumber) : 0, 
        longitude: suggestion.geometry.coordinates[0],
        latitude: suggestion.geometry.coordinates[1],
        villeAdresse: {
            villeId: 0,
            codeInsee: props.citycode || "",
            nomVille: props.city || "",
            codePostalVille: props.postcode || "",
            taxeSejour: 0,
            departementAssocie: null
        }
    };
}

async function deposerAnnonce() {
    try {
        const resultat = await annonceStore.postAnnonce(newAnnonce.value);
        console.log("Annonce créée avec succès !", resultat);
        router.push('/'); 
    } catch (error) {
        console.error("Échec du dépôt de l'annonce :", error);
        alert("Une erreur est survenue lors du dépôt.");
    }
}
</script>

<template>
    <div class="deposer-une-annonce">
        <div class="form" id="depos-annonce-form">
            <div class="step-1" v-if="step == 1">
                <h1>Commençons par l'essentiel !</h1>
                <p class="comment"><sup>*</sup>champs obligatoires</p>
                <FieldInput name="annonce-name" label="Quel est le titre de l'annonce ?" v-model="newAnnonce.titreAnnonce" required="true" />
                <Button class="btn-next" @click="step+=1">Continuer</Button>
            </div>
            <div v-else-if="step == 2">
                <h1>Où se situe votre bien ?</h1>
                
                <div class="address-container">
                    <FieldInput 
                        v-model="query" 
                        @input="searchAddress" 
                        class="input-element" 
                        label="Votre adresse"
                        required="true" />
                    <ul v-if="suggestions.length > 0" class="suggestions-list">
                        <li 
                            v-for="s in suggestions" 
                            :key="s.properties.id" 
                            @click="selectSuggestion(s)"
                        >
                            {{ s.properties.label }}
                        </li>
                    </ul>
                </div>

                <div class="map">
                    <MapComponent 
                    :key="longitudeTest"
                        :latitude="latitudeTest" 
                        :longitude="longitudeTest" 
                    ></MapComponent>
                </div>

                <div class="actions">
                    <Button @click="step-=1">Retour</Button>
                    <Button @click="step+=1">Continuer</Button>
                </div>
            </div>
            <div v-else-if="step == 3">
                <h1>Ajoutez des photos</h1>
                <input id="file-upload" type="file" accept="image/*" multiple @change="handleFileUpload" />
                <div class="preview-container">
                    <div v-for="(photo, index) in newAnnonce.photos" :key="index" class="photo-item">
                        <img :src="photo.url" alt="Aperçu de l'annonce">
                        <button @click.prevent="removePhoto(index)" class="delete-btn">X</button>
                    </div>
                </div>
                <div class="actions">
                    <Button @click="step-=1">Retour</Button>
                    <Button @click="step+=1">Continuer</Button>
                </div>
            </div>
            <div v-else-if="step == 4">
                <h1>Dites-nous en plus</h1>
                <h3>Choisissez votre type de bien<sup>*</sup></h3>
                <div class="types">
                    <div class="type" v-for="type in types">
                        <input 
                            type="radio" 
                            name="typeBien" 
                            :id="type.name" 
                            :value="type.name" 
                            v-model="newAnnonce.typeHebergementBien.libelleTypeHebergement">
                        <label :for="type.name">{{type.name}}</label>
                    </div>
                </div>
                <div>
                    <h3>Les critères indispensables</h3>
                    <div>
                        <FieldInputWithUnit v-model="surfaceHabitable" name="surface" label="Surface habitable" unit="m²" required="true" />
                        <p class="comment">Comptez les surfaces intérieures habitables d'une hauteur sous plafond de plus de 1,80 m.</p>
                        <FieldInputWithUnit v-model="newAnnonce.capacitePersonne" name="capacity" label="Capacité" unit="personne(s)" />
                        <FieldInputWithUnit v-model="newAnnonce.nbChambre" name="rooms" label="Nombre de chambres" unit="pièce(s)" />
                        <p class="comment">Ne comptez que les pièces de séjour ou chambres, hors cuisine, salle d'eau, WC, couloirs, caves et dépendances.</p>
                        
                            <div class="input-group">
                                <label>Horaire d'arrivée</label>
                                <input class="input-element"/>
                            </div>
                            <div class="input-group">
                                <label>Horaire de départ</label>
                                <input class="input-element"/>
                            </div>
                       
                            <div class="input-group">
                                <label>Équipements</label>
                                <Dropdown 
                                    v-model="newAnnonce.equipementsInclus" 
                                    :options="tousLesEquipements" 
                                    placeholder="Ajouter un équipement..." 
                                />
                                
                                <div class="tags-container">
                                    <ul>
                                        <li v-for="item in newAnnonce.equipementsInclus" :key="item.equipementId" class="tag">
                                            {{ item.nomEquipement }}
                                            <button @click="retirerEquipement(item.equipementId)" class="bouton-supprimer">×</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="input-group">
                                <label>Services</label>
                                <Dropdown 
                                    v-model="newAnnonce.servicesProposes" 
                                    :options="tousLesServices" 
                                    placeholder="Ajouter un service..." 
                                />
                                
                                <div class="tags-container">
                                    <ul>
                                        <li v-for="item in newAnnonce.servicesProposes" :key="item" class="tag">
                                            {{ item }}
                                            <button @click="retirerService(item)" class="bouton-supprimer">×</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        <div class="input-group">
                            <input v-model="newAnnonce.conditionHebergementBien.animauxAcceptes" type="checkbox" />
                            <label>Animaux acceptés</label>
                        </div>
                        <div class="input-group">
                            <input v-model="newAnnonce.conditionHebergementBien.fumeur" type="checkbox" />
                            <label>Fumeurs acceptés</label>
                        </div>
                    </div>
                </div>
                <div class="actions">
                    <Button @click="step-=1">Retour</Button>
                    <Button @click="step+=1">Continuer</Button>
                </div>
            </div>
            <div v-else-if="step == 5">
                <h3>Description de l'annonce<sup>*</sup></h3>
                <textarea v-model="newAnnonce.descriptionAnnonce" id="" rows="10"></textarea>
                <p>Vérifiez que le bien que vous proposez n'est pas dans une ville qui réglemente les locations de vacances. Si c'est le cas, vous devez désormais vous enregistrer sur le site de votre mairie. </p>
                <Button @click="step-=1">Retour</Button>
                <Button @click="step+=1">Continuer</Button>
            </div>
            <div v-else-if="step == 6">
                <h1>Quel est votre prix ?</h1>
                <FieldInputWithUnit v-model="newAnnonce.prix" name="price" label="Prix minimum par nuit" unit="€" required="true" />
                <div class="actions">
                    <Button @click="step-=1">Retour</Button>
                    <Button @click="deposerAnnonce">Déposer mon annonce</Button>
                </div>
            </div>
        </div>
        <aside class="tips">
            <div class="tips-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-title="SvgLightBulbOutline" fill="currentColor" class="fill-current shrink-0 text-main w-sz-40 h-sz-40 mr-sm shrink-0" data-spark-component="icon" aria-hidden="true" focusable="false"><title>Icône tips</title><path d="M10.325 22C9.91667 22 9.53333 21.8399 9.24167 21.5535C8.95 21.2671 8.78333 20.8795 8.76667 20.4667V18.5375C8.04167 18.0741 7.425 17.4591 6.95833 16.7262C6.375 15.8163 6.04167 14.7633 5.99167 13.6849C5.94167 12.6066 6.18333 11.5282 6.68333 10.5678C7.18333 9.60741 7.93333 8.80708 8.84167 8.2342C9.75833 7.66133 10.8 7.34962 11.875 7.33277C12.95 7.31592 14.0083 7.57709 14.9417 8.10783C15.875 8.63858 16.6583 9.41365 17.2 10.3488C17.7417 11.2839 18.025 12.3538 18.0167 13.4322C18 14.5611 17.6833 15.6563 17.1 16.5998C16.625 17.3665 15.9917 18.0067 15.2417 18.4954V20.4414C15.2333 20.8795 15.0667 21.2671 14.775 21.5535C14.4833 21.8399 14.0917 22 13.6833 22H10.325ZM10.7667 19.9781H13.2333V17.9056C13.2333 17.5181 13.45 17.1727 13.7917 17.0042C14.45 16.6672 15.0083 16.1618 15.4 15.5299C15.7917 14.8981 16.0083 14.1735 16.0167 13.4238C16.0167 12.6992 15.8333 11.9916 15.4667 11.3682C15.1083 10.7447 14.5833 10.2224 13.9583 9.86858C13.3333 9.51474 12.6083 9.34625 11.9083 9.35468C11.1917 9.37152 10.4917 9.58214 9.88333 9.96125C9.275 10.3404 8.775 10.8795 8.44167 11.5198C8.10833 12.1601 7.95 12.8762 7.98333 13.6007C8.01667 14.3252 8.24167 15.0244 8.63333 15.631C9.025 16.2376 9.56667 16.7262 10.2083 17.0463C10.55 17.2148 10.7667 17.5687 10.7667 17.9478V19.9781ZM21 10.5847H18.85C18.3 10.5847 17.85 10.1297 17.85 9.57372C17.85 9.01769 18.3 8.56276 18.85 8.56276H21C21.55 8.56276 22 9.01769 22 9.57372C22 10.1297 21.55 10.5847 21 10.5847ZM5.15 10.5847H3C2.45 10.5847 2 10.1297 2 9.57372C2 9.01769 2.45 8.56276 3 8.56276H5.15C5.7 8.56276 6.15 9.01769 6.15 9.57372C6.15 10.1297 5.7 10.5847 5.15 10.5847ZM7.78333 7.64448C7.525 7.64448 7.26667 7.54339 7.075 7.3412L5.55833 5.79107C5.16667 5.39511 5.175 4.75484 5.55833 4.35889C5.95 3.96293 6.58333 3.97136 6.975 4.35889L8.49167 5.90901C8.88333 6.30497 8.875 6.94524 8.49167 7.3412C8.3 7.53496 8.04167 7.63606 7.79167 7.63606L7.78333 7.64448ZM16.2083 7.64448C15.95 7.64448 15.7 7.54339 15.5083 7.34962C15.1167 6.95366 15.1167 6.3134 15.5083 5.91744L17.025 4.36731C17.4167 3.97136 18.05 3.97136 18.4417 4.36731C18.8333 4.76327 18.8333 5.40354 18.4417 5.79949L16.925 7.34962C16.7333 7.55181 16.475 7.65291 16.2167 7.65291L16.2083 7.64448ZM11.9917 6.19545C11.4417 6.19545 10.9917 5.74052 10.9917 5.1845V3.01095C10.9917 2.45493 11.4417 2 11.9917 2C12.5417 2 12.9917 2.45493 12.9917 3.01095V5.1845C12.9917 5.74052 12.5417 6.19545 11.9917 6.19545Z"></path></svg>
            </div>
            <br>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto perferendis quo quos amet voluptatum expedita nam nesciunt iure, magnam laudantium, dicta commodi deleniti molestiae fugit culpa aliquam animi iste esse.</p>
        </aside>
    </div>
</template>

<style scoped>

    .deposer-une-annonce {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 3rem;
        height: 100%;
        margin: 10vh 20vw;
    }

    .tips {
        width: 50%;
        height: 100%;
        text-align: center;
        font-size: 0.875rem;
        color: dimgray;
    }

    .tips-icon {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }

    .tips-icon::before {
        content: "";
        width: 50%;
        height: 1px;
        background-color: var(--main-color);
    }
    
    .tips-icon::after {
        content: "";
        width: 50%;
        height: 1px;
        background-color: var(--main-color);
    }

    .tips .tips-icon svg {
        height: 3rem;
        color: var(--main-color);
    }

    #depos-annonce-form{
        width: 100%;
    }
    
    .input-element{
        margin: 5px;
    }
    .comment {
        color: gray;
        font-size: 0.75rem;
        margin: 1rem 0;
    }

    sup {
        color: red;
    }

    .btn-next {
        margin: 2rem 0;
        float: right;
    }

    .actions {
        display: flex;
        width: 100%;
        justify-content: space-around;
        align-items: center;
        margin: 0;
    }

    .map{
        width: 100%;
        display: block;
        margin: 0 auto;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .preview-container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .photo-item {
        position: relative;
        width: 120px;
        height: 120px;
    }
    .photo-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
        border: 1px solid #ddd;
    }
    .delete-btn {
        position: absolute;
        top: -5px;
        right: -5px;
        background: red;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        width: 20px;
        height: 20px;
        font-size: 12px;
    }

    .types {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .type {
        display: flex;
        align-items: center;
        gap: 0.125rem;
    }

    textarea {
        width: 100%;
        padding: 0.5rem;
        font-size: 1rem;
    }

    /*-------------API--------------*/
    .address-container {
        position: relative;
        width: 100%;
        margin: 0 auto;
    }

    .suggestions-list {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #ccc;
        border-radius: 0 0 8px 8px;
        list-style: none;
        padding: 0;
        z-index: 1000;
        text-align: left;
    }

    .suggestions-list li {
        padding: 10px;
        cursor: pointer;
        border-bottom: 1px solid #eee;
    }

    .suggestions-list li:hover {
        background-color: #f0f0f0;
    }

    /*------------API---------------*/
</style>