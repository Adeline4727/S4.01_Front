<script setup>
defineProps({
  icon: String,
  placeholder: String,
  hasChevron: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="searchbar-with-icon">
    <input type="text" :placeholder="placeholder">
    <ion-icon class="icon" :name="icon"></ion-icon>
    <ion-icon v-if="hasChevron" class="cv" name="chevron-down"></ion-icon>
  </div>
</template>

<style scoped>
/* Tes styles restent identiques */
.searchbar-with-icon {
  position: relative;
}
.searchbar-with-icon input {
  font-size: 1rem;
  padding: 0.75rem;
  padding-left: 2.5rem;
  outline: none;
  border: 1px solid #888;
  border-radius: 1rem;
}
.searchbar-with-icon .icon {
  position: absolute;
  z-index: 100;
  font-size: 1.5rem;
  top: 20%;
  left: 0.75rem;
}
.searchbar-with-icon .cv {
  position: absolute;
  font-size: 1.125rem;
  top: 30%;
  right: 0.5rem;
}
</style>