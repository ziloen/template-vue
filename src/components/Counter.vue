<script setup lang="ts">
import { useCounter } from '@vueuse/core'
import { useCounterStore } from '~/stores/counter'

const props = defineProps<{
  initial: number
}>()

const counterStore = useCounterStore()
const { count, inc, dec } = useCounter(props.initial)
</script>

<template>
  <div>
    <div class="flex-center flex-col">
      <span>useCounter: {{ count }}</span>
      <div class="flex gap-2">
        <button class="btn" @click="dec()">-</button>
        <button class="btn" @click="inc()">+</button>
      </div>
    </div>

    <div class="flex-center flex-col">
      <span>counterStore: {{ counterStore.count }}</span>
      <div class="flex gap-2">
        <button
          class="btn"
          :disabled="counterStore.count <= 0"
          @click="counterStore.decrement(Math.random())"
        >
          -
        </button>
        <button class="btn" @click="counterStore.increment(Math.random())">+</button>
      </div>
    </div>
  </div>
</template>
