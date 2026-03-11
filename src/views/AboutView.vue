<script setup>
import { ref } from 'vue'
let x=  ref(42)

</script>


<template>
  <div class="about">
    <h1>A propos</h1>
    <h3> {{x}} </h3>

  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
