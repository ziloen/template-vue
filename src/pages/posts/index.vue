<template>
  <ol class="flex h-full flex-col gap-4 overflow-y-auto text-left">
    <li v-for="(post, i) of allPosts" :key="post.id">
      <h1 class="text-2xl">{{ i + 1 }}. {{ post.title }}</h1>
      <p>{{ post.body }}</p>
    </li>
  </ol>
</template>

<script lang="ts" setup>
import type { Post } from '~/api'
import { API } from '~/api'
const loading = ref(false)
const allPosts = ref<Post[]>([])

API.getPostList().then((p) => (allPosts.value = p))
</script>

<style scoped></style>
