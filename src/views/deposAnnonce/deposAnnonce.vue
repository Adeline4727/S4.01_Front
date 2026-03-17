<script setup>
import Button from '@/components/Button.vue';
import MapComponent from '@/components/MapComponent.vue';
import { ref } from 'vue'
const isLogin = ref(true)
const step = ref(1)
import { RouterLink, RouterView } from 'vue-router'

const types = [

    {name:"maison"},
    {name:"appartement"},
    {name:"Autres"},

]

const photos = ref([])

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  
  files.forEach(file => {
    const photoObject = {
      file: file,
      url: URL.createObjectURL(file) 
    }
    photos.value.push(photoObject)
  })
}

const removePhoto = (index) => {

  URL.revokeObjectURL(photos.value[index].url)
  photos.value.splice(index, 1)
}
//-----------API-----------

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
        suggestions.value = data.features
      } catch (error) {
        console.error("Erreur API Adresse :", error)
      }
  },300)
}

const selectSuggestion = (suggestion) => {
  query.value = suggestion.properties.label
  selectedAddress.value = suggestion
  suggestions.value = []
}



//-----------API-----------
</script>

<template>
    <form id="depos-annonce-form">
        <div v-if="step == 1">
            <h1>Commençons par l'essentiel !</h1>
            <p class="comment">* champs obligatoire</p>
            <div class="input-group">
              <label>Quel est le titre de l'annonce</label>
              <input class="input-element"/>
            </div>
            <Button @click="step+=1">Continuer</Button>
        </div>
        <div v-else-if="step == 2">
            <h1>Où se situe votre bien ?</h1>
            
            <div class="address-container">
                <input 
                    v-model="query" 
                    @input="searchAddress" 
                    class="input-element" 
                    placeholder="Saisissez votre adresse..."/>
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
                    :latitude="selectedAddress ? selectedAddress.geometry.coordinates[1] : 45.8992" 
                    :longitude="selectedAddress ? selectedAddress.geometry.coordinates[0] : 6.1293"
                ></MapComponent>
            </div>

            <Button @click="step-=1">Retour</Button>
            <Button @click="step+=1">Continuer</Button>
        </div>
        <div v-else-if="step == 3">
            <h1>Ajoutez des photos</h1>
            <input id="file-upload" type="file" accept="image/*" multiple @change="handleFileUpload" />
            <div class="preview-container">
                <div v-for="(photo, index) in photos" :key="index" class="photo-item">
                    <img :src="photo.url" alt="Aperçu de l'annonce">
                    
                    <button @click.prevent="removePhoto(index)" class="delete-btn">X</button>
                </div>
            </div>
            <Button @click="step-=1">Retour</Button>
            <Button @click="step+=1">Continuer</Button>
        </div>
        <div v-else-if="step == 4">
            <h1>Dites-nous en plus</h1>
            <h3>Choisissez votre type de bien*</h3>
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
                        <p class="comment">Comptez les surfaces intérieures habitables d'une hauteur sous plafond de plus de 1,80m.</p>
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
    .comment{
        font-style: italic;
        color: gray;
        size: 10px;
    }
    .map{
        width: 50%;
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

    /*-------------API--------------*/
    .address-container {
        position: relative; /* Important pour le positionnement de la liste */
        width: 100%;
        max-width: 400px;
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
        z-index: 1000; /* Passe au-dessus des autres éléments */
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