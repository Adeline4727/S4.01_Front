<script setup>
    const props = defineProps({
      donnee: String,
      isDisabled: {
        type: String,
        required: false,
        default: ""
      },
      icon: {
        type: String,
        required: false,
        default: ""
      },
      buttonWidth: {
        type: Number,
        required: false,
        default: "220"
      }
    })

    const estImage = (valeur) => {
  
    }
</script>

<template>
  <button v-if="estImage(donnee)" class="imgclasse" type="button">  <slot> </slot> </button>

  <button
      v-else class="pclasse"
      type="button"
      :disabled="isDisabled !== ''"
      :style="`width: ${buttonWidth}px;`">

    <ion-icon v-if="icon !== ''" :name="icon" size="large"></ion-icon>
    <p> <slot> </slot> </p>

  </button>

</template>


<style scoped>
      .pclasse{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        color: white;
        background-color: var(--main-color);
        border: none;
        border-radius: 15px;
        margin-left:3%;
        margin-right:3%;
        height:50px;
        font-size: 18px;
      }
      .pclasse:hover {
        background-color: #ec5a13e5;
        cursor: pointer;
      }

      .pclasse:disabled {
        opacity: 0.5;
      }

      .pclasse:disabled:hover {
        background-color: var(--main-color);
        cursor: auto;
        opacity: 0.5;
      }

      .imgclasse{
         
        width:40px
      }

</style>
