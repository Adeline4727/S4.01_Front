<script setup>
import { ref } from 'vue'

const props = defineProps({
    annonce: {
        required: true,
    }
})

const modalOuverte = ref(false)
const indexActuel = ref(0)

const ouvrirModal = (index) => {
    indexActuel.value = index
    modalOuverte.value = true
}

const fermerModal = () => {
    modalOuverte.value = false
}

const photoPrecedente = () => {
    indexActuel.value = (indexActuel.value - 1 + props.annonce.photos.length) % props.annonce.photos.length
}

const photoSuivante = () => {
    indexActuel.value = (indexActuel.value + 1) % props.annonce.photos.length
}

const gererTouche = (e) => {
    if (!modalOuverte.value) return
    if (e.key === 'ArrowLeft') photoPrecedente()
    if (e.key === 'ArrowRight') photoSuivante()
    if (e.key === 'Escape') fermerModal()
}

const urlPhoto = (lienurl) => "/" + lienurl
</script>

<template>
    <!-- Grille de photos -->
    <div class="photos" @keydown="gererTouche" tabindex="0">

        <!-- Aucune photo -->
        <div v-if="annonce.photos.length === 0" class="vide">
            Aucune photo disponible
        </div>

        <!-- Une seule photo -->
        <div v-else-if="annonce.photos.length === 1" class="grille grille-1" @click="ouvrirModal(0)">
            <img :src="urlPhoto(annonce.photos[0].lienurl)" alt="" class="photo photo-principale"/>
        </div>

        <!-- Deux photos -->
        <div v-else-if="annonce.photos.length === 2" class="grille grille-2" @click="ouvrirModal(0)">
            <img :src="urlPhoto(annonce.photos[0].lienurl)" alt="" class="photo"/>
            <img :src="urlPhoto(annonce.photos[1].lienurl)" alt="" class="photo"/>
        </div>

        <!-- 3 photos ou plus -->
        <div v-else class="grille grille-3">
            <img :src="urlPhoto(annonce.photos[0].lienurl)" alt="" class="photo photo-grande" @click="ouvrirModal(0)"/>
            <div class="grille-droite">
                <img :src="urlPhoto(annonce.photos[1].lienurl)" alt="" class="photo" @click="ouvrirModal(1)"/>
                <div class="photo-derniere" @click="ouvrirModal(2)">
                    <img :src="urlPhoto(annonce.photos[2].lienurl)" alt="" class="photo"/>
                    <div v-if="annonce.photos.length > 3" class="overlay-plus">
                        +{{ annonce.photos.length - 3 }} photos
                    </div>
                </div>
            </div>
        </div>

        <!-- Bouton "Voir toutes les photos" -->
        <button v-if="annonce.photos.length > 0" class="btn-toutes-photos" @click="ouvrirModal(0)">
            Voir les {{ annonce.photos.length }} photos
        </button>
    </div>

    <!-- Modale -->
    <Teleport to="body">
        <div v-if="modalOuverte" class="modal-overlay" @click.self="fermerModal" @keydown="gererTouche" tabindex="0">
            <div class="modal-contenu">

                <!-- Header -->
                <div class="modal-header">
                    <span class="modal-compteur">{{ indexActuel + 1 }} / {{ annonce.photos.length }}</span>
                    <button class="btn-fermer" @click="fermerModal">✕</button>
                </div>

                <!-- Photo principale -->
                <div class="modal-photo-container">
                    <button class="btn-nav btn-precedent" @click="photoPrecedente" v-if="annonce.photos.length > 1">‹</button>
                    <img :src="urlPhoto(annonce.photos[indexActuel].lienurl)" alt="" class="modal-photo"/>
                    <button class="btn-nav btn-suivant" @click="photoSuivante" v-if="annonce.photos.length > 1">›</button>
                </div>

                <!-- Miniatures -->
                <div class="modal-miniatures" v-if="annonce.photos.length > 1">
                    <img
                        v-for="(photo, index) in annonce.photos"
                        :key="index"
                        :src="urlPhoto(photo.lienurl)"
                        alt=""
                        class="miniature"
                        :class="{ 'miniature-active': index === indexActuel }"
                        @click="indexActuel = index"
                    />
                </div>

            </div>
        </div>
    </Teleport>
</template>

<style scoped>
/* --- Grille --- */
.photos {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 400px;
}

.vide {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    color: #999;
    font-size: 14px;
}

.grille {
    width: 100%;
    height: 100%;
    display: grid;
    gap: 4px;
}

.grille-1 { grid-template-columns: 1fr; }

.grille-2 { grid-template-columns: 1fr 1fr; }

.grille-3 {
    grid-template-columns: 2fr 1fr;
}

.grille-droite {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 4px;
    height: 100%;
}

.photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.2s ease;
}

.photo:hover { filter: brightness(0.9); }

.photo-derniere {
    position: relative;
    overflow: hidden;
    height: 100%;
}

.overlay-plus {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 18px;
}

/* Bouton voir toutes les photos */
.btn-toutes-photos {
    position: absolute;
    bottom: 35px;
    right: 12px;
    background: white;
    border: none;
    border-radius: 8px;
    padding: 8px 14px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    transition: background 0.2s;
}

.btn-toutes-photos:hover { background: #f5f5f5; }

/* --- Modale --- */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.92);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-contenu {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 16px;
    gap: 12px;
}

.modal-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
}

.modal-compteur {
    font-size: 15px;
    font-weight: 500;
}

.btn-fermer {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 4px 10px;
    border-radius: 50%;
    transition: background 0.2s;
}

.btn-fermer:hover { background: rgba(255,255,255,0.15); }

.modal-photo-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    min-height: 0;
}

.modal-photo {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    border-radius: 8px;
}

.btn-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255,255,255,0.15);
    border: none;
    color: white;
    font-size: 40px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    line-height: 1;
}

.btn-nav:hover { background: rgba(255,255,255,0.3); }
.btn-precedent { left: 12px; }
.btn-suivant { right: 12px; }

/* Miniatures */
.modal-miniatures {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 4px;
    max-width: 100%;
}

.miniature {
    width: 64px;
    height: 48px;
    object-fit: cover;
    border-radius: 4px;
    cursor: pointer;
    opacity: 0.5;
    border: 2px solid transparent;
    flex-shrink: 0;
    transition: opacity 0.2s, border-color 0.2s;
}

.miniature:hover { opacity: 0.8; }

.miniature-active {
    opacity: 1;
    border-color: white;
}

/* Mobile */
@media (max-width: 768px) {
    .photos { height: 250px; }
    .btn-nav { display: none; }
    .grille-3 { grid-template-columns: 1fr; }
    .grille-droite { display: none; }
}
</style>