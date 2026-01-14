<template>
  <button class="icon-btn" @click="toggleDark()">
    <div class="i-carbon-sun dark:i-carbon-moon" />
  </button>
</template>

<script lang="ts" setup>
import { toggleDark } from '~/composables'
</script>
