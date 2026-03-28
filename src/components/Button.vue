<script setup>
    const props = defineProps({
      donnee: String,
      isDisabled: {
        type: String,
        required: false,
        default: ""
      }
    })

    const estImage = (valeur) => {
  
    }
</script>

<template>
  <button v-if="estImage(donnee)" class="imgclasse" type="button">  <slot> </slot> </button>

  <button v-else class="pclasse" type="button" :disabled="isDisabled !== ''">
    <p> <slot> </slot> </p>
  </button>

</template>


<style scoped>
      .pclasse{
        color: white;
        background-color: var(--main-color);
        border: none;
        border-radius: 15px;
        width: 220px;
        margin-left:3%;
        margin-right:3%;
        height:50px;
        font-size: 18px;
      }
      .pclasse:hover {
        background-color: #ec5a13e5;
        cursor: pointer;
      }

      .imgclasse{
         
        width:40px
      }

</style>
