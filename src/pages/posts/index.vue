<template>
  <ol class="flex flex-col gap-4 text-left">
    <li v-for="(post, i) of allPosts" :key="post.id">
      <h1 class="text-2xl">{{ i + 1 }}. {{ post.title }}</h1>
      <p>{{ post.body }}</p>
    </li>
  </ol>
</template>

<script lang="ts" setup>
import type { Post } from '~/api/post'
import { getPostListAPI } from '~/api/post'
const loading = ref(false)
const allPosts = ref<Post[]>([])

getPostListAPI().then((p) => (allPosts.value = p))
</script>

<style scoped></style>
