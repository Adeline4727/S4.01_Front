<script setup>
import { ref } from 'vue';
import { addIcons } from 'ionicons';
import { RouterLink } from 'vue-router';

// --- NOUVEAU : Logique d'autocomplétion ---
const searchQuery = ref('');
const cities = ref([]);
let timeoutId = null;

const onSearchInput = () => {
  // On ne déclenche la recherche qu'à partir de 2 caractères
  if (searchQuery.value.length < 2) {
    cities.value = [];
    return;
  }

  // on attend 300ms avant d'appeler l'API
  clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    try {
      const response = await fetch(`https://geo.api.gouv.fr/communes?nom=${searchQuery.value}&boost=population&limit=5`);
      if (response.ok) {
        cities.value = await response.json();
      }
    } catch (error) {
      console.error("Erreur de récupération des villes:", error);
    }
  }, 300);
};

const selectCity = (city) => {
  searchQuery.value = city.nom; 
  cities.value = [];            
  console.log("Ville sélectionnée :", city);
};

</script>

<template>
    <div class="search-container">
        <input 
            type="text" 
            placeholder="Annecy, appartement T2 etc ..."
            v-model="searchQuery"
            @input="onSearchInput"
        >
        <RouterLink to="recherche" class="btn-loupe">
            <ion-icon name="search-outline"></ion-icon>
        </RouterLink>

        <ul v-if="cities.length > 0" class="suggestions-list">
            <li 
                v-for="city in cities" 
                :key="city.code" 
                @click="selectCity(city)"
            >
                {{ city.nom }} <span class="postal-code">({{ city.codesPostaux[0] }})</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    /* ajout de position relative pour mettre la liste déroulante */
    .search-container {
        align-items: center;
        width: 100%;
        position: relative; 
    }

    input {
        box-shadow: none;
        font-size: 1rem;
        border-radius: 1rem;
        width: 350px;
        height: 2.5rem;
        padding-left: 15px;
        padding-right: 45px;
        outline: none;
        vertical-align: middle;
        background-color: #E4E4E4;
        border: 1px solid #E4E4E4;
    }

    .btn-loupe {
        vertical-align: middle;
        font-size: 1.125rem;
        border: none;
        border-radius: 0.875rem;
        padding: 0.5rem 0.75rem;
        cursor: pointer;
        margin-left: -3.5rem;
        color: white;
        background-color: #f27b42;
    }

    img {
        width: 25px;
        display: block;
    }

    /*style liste deroulante*/
    .suggestions-list {
        position: absolute;
        top: 3rem; 
        left: 0;
        width: 350px; 
        margin: 0;
        padding: 0;
        list-style: none;
        background: white;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
         
    }

    .suggestions-list li {
        padding: 10px 15px;
        cursor: pointer;
        border-bottom: 1px solid #eee;
        font-size: 0.95rem;
        color: #333;
        transition: background-color 0.2s;
    }

    .suggestions-list li:last-child {
        border-bottom: none;
    }

    .suggestions-list li:hover {
        background-color: #f27b42; 
        color: white;
    }

    .postal-code {
        color: #888;
        font-size: 0.85rem;
        margin-left: 5px;
    }

    /* survol code postal*/
    .suggestions-list li:hover .postal-code {
        color: #ffe0d1; 
    }
</style>