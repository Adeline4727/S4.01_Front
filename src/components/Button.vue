<script setup>
    const props = defineProps({
  donnee: String // Ce que tu passes au composant (un texte ou un chemin d'image)
})

    const estImage = (valeur) => {
  
}
</script>

<template>
   <button v-if="estImage(donnee)" 
   class="imgclasse">  <slot> </slot> </button>

    <button v-else class="pclasse"> <p >
      <slot> </slot> </p>
     </button>

     
     

</template>


<style scoped>
      .pclasse{
        color: white;
        background-color:#EA7737;
        border: #EA7737 1px solid;
        border-radius: 15px;
        width: 220px;
        margin-left:3%;
        margin-right:3%;
        height:50px;
      }
      .imgclasse{
         
        width:40px
      }

</style>
