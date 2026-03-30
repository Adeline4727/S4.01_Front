<script setup>
import Button from "@/components/Button.vue";

const props = defineProps({
  doesNameAppear: {
    type: String,
    required: false,
    default: "no"
  },
  pfpWidth: {
    type: Number,
    required: false,
    default: 50
  },
  name: {
    type: String,
    required: false,
    default: localStorage.getItem('name')
  }
})

// const userName = localStorage.getItem('name')
const pfp = localStorage.getItem('pfp')
</script>

<template>
  <RouterLink to="/account/private/home">
    <button class="profile-button">
      <img v-if="pfp" :src="'/' + pfp" alt="imgProfil" :width="pfpWidth">
      <div v-else class="avatarLettre" v-if="name" :style="'width: ' + pfpWidth + 'px; height: ' + pfpWidth + 'px;'">{{ name ? name.charAt(0).toUpperCase() : 'A' }}</div>
      <p v-if="doesNameAppear !== 'no'">{{name}}</p>
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

.profile-button img {
  border-radius: 50%;
  margin-bottom: 1px;
}

.profile-button p {
  font-size: 0.75rem;
}
</style>