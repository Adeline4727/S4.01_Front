<script setup>
import {ref, computed, useTemplateRef, onMounted} from 'vue';

const props = defineProps({
    annonce : {
        required : true,
    }
})

</script>
<template>
    <!-- <div v-if="annonce.photos.length==0" class="photos">Cette annonce ne contient pas de photos</div>
    <div v-else-if="annonce.photos.length==1" class="photos"><img :src="annonce.photos[0].lienurl" alt="" class="unePhoto"></div>
    <div v-else-if="annonce.photos.length==2" class="photos">
        <img :src="annonce.photos[0].lienurl" alt="" class="deuxPhotosUn">
        <img :src="annonce.photos[1].lienurl" alt="" class="deuxPhotosDeux">
    </div>
    <div v-else class="photos">
        <img :src="annonce.photos[0].lienurl" alt="" class="troisPhotosUn">
        <img :src="annonce.photos[1].lienurl" alt="" class="troisPhotosDeux">
        <img :src="photo.lienUrlannonce.photos[2].lienurl" alt="" class="troisPhotosTrois">
    </div> -->
</template>
<style scoped>
.photos{
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}
.deuxPhotosUn, .deuxPhotosDeux{
    height: auto;
}
.deuxPhotosUn{
    padding-right: 5px;
}
.deuxPhotosDeux{
    padding-left: 5px;
}
</style>