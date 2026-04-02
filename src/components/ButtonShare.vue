<script setup>
import { ref } from 'vue'
const sharing = ref(false)

function click(){
    sharing.value = !sharing.value
}

async function clickCopy (){
    try {
    await navigator.clipboard.writeText(window.location.href);
    
    alert('Lien copié dans le presse-papier !'); 
  } catch (err) {
    console.error('Erreur lors de la copie du lien :', err);
  }
}

function clickWhatsapp(){
    const currentUrl = window.location.href;
    const text = encodeURIComponent("Que penses tu de cette location ? : " + currentUrl);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    sharing.value = false;
}

function clickMail(){
    const currentUrl = window.location.href;
    const subject = encodeURIComponent("Je partage ce lien avec toi");
    const body = encodeURIComponent("Salut,\n\nJ'ai pensé que ce lien pourrait t'intéresser :\n" + currentUrl);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    sharing.value = false;
}
</script>

<template>
    <div class="tout">
    <button class="share-button" @click="click">
        <ion-icon name="share-social-outline"></ion-icon>
    </button>
    <div class="rectangle-modale" v-if="sharing">
        <ion-icon name="copy-outline" class="iconPartage copy" @click="clickCopy"></ion-icon>
        <ion-icon name="logo-whatsapp" class="iconPartage what" @click="clickWhatsapp"></ion-icon>
        <ion-icon name="mail-outline" class="iconPartage mail" @click="clickMail"></ion-icon>
    </div>
    </div>
</template>

<style>
button{
    padding: 0px;
    border: none;
    background-color: transparent;
}
    .share-button {
        display: flex;
        background-color: white;
        width: 1.5rem;
        height: 1.5rem;
        font-size: 1rem;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        border :none;
    }

    .share-button:hover {
        background-color: #F5F5F5;
    }

    .rectangle-modale{
        display: flex;
        flex-direction: column;
        position: absolute;
        background-color: white;
        border-radius: 10px;
        justify-content: center;
        align-items: center;
        top: 30px;
        width: fit-content;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }

    .iconPartage{
        padding:10px;
    }

    .copy{
        border-radius: 10px 10px 0px 0px;
    }
    .mail{
        border-radius: 0px 0px 10px 10px;
    }

    .iconPartage:hover{
        background-color: #F5F5F5;
    }
</style>