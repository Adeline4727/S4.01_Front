<script setup>
defineProps({
  nomInput: {
    type: String,
    required: true
  }
})
</script>

<template>
    <div class="centre" id="top-deplacement">
  <label :for="nomInput">
    <slot></slot>
  </label>
</div>
  <input type="text" :name="nomInput" :id="nomInput"  class="centre">
</template>

<style scoped>


.centre{
    position:absolute;
  left:48%;

  
}

input{
    margin-top:45px;
}
#top-deplacement{
    margin-top:18px;
}
</style>