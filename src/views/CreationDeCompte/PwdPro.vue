<script setup>
import { ref } from 'vue'
let x=  ref(42)
import { RouterLink, RouterView } from 'vue-router'
import InputText from '@/components/InputText.vue'

</script>


<template>
  
  <div class="form-Pwd">
    <h3 class="espacement"> Dernieres étapes !
    </h3>  

    <h4 class="espacement">e-mail</h4>
    <InputText class="espacement"></InputText>

        <h4 class="espacement">votre mot de passe </h4>

    <input class="espacement" type="password" >

    <RouterLink class="boutton_Suivant espacement" to="/">crée</RouterLink>
    <RouterView />
</div>

</template>

<style scoped>


.form-Pwd{
    display:flex;
  flex-direction:column;
  align-items:center;
}

.espacement{
    margin-bottom:20px;
    margin-top:20px;
}





</style>