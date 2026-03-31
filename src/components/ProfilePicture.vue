<script setup>
import { computed } from 'vue';

const props = defineProps({
  doesNameAppear: {
    type: String,
    default: "no"
  },
  pfpWidth: {
    type: Number,
    default: 50
  },
  name: {
    type: String,
    // On garde le localStorage en dernier recours
    default: () => localStorage.getItem('name') || ''
  }
})

const pfp = localStorage.getItem('pfp')

const avatarStyle = computed(() => ({
  width: `${props.pfpWidth}px`,
  height: `${props.pfpWidth}px`
}))
</script>

<template>
  <RouterLink to="/account/private/home">
    <button class="profile-button">
      <img v-if="pfp" :src="'/' + pfp" alt="imgProfil" :width="pfpWidth">
      
      <div v-else-if="name" class="avatarLettre" :style="avatarStyle">
        {{ name.charAt(0).toUpperCase() }}
      </div>
      
      <div v-else class="avatarLettre" :style="avatarStyle">A</div>

      <p v-if="doesNameAppear !== 'no'">{{ name }}</p>
    </button>
  </RouterLink>
</template>

<style scoped>
.profile-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
}
.profile-button img { border-radius: 50%; }
.profile-button p { font-size: 0.75rem; }
.avatarLettre {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ccc;
  border-radius: 50%;
  font-weight: bold;
}
</style>