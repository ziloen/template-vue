import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  /** 计数器 */
  const count = ref(0)

  /** 增加计数 */
  function increment(step = 1) {
    count.value += step
  }

  /** 减少计数（不会小于0） */
  function decrement(step = 1) {
    const next = count.value - step
    count.value = next >= 0 ? next : 0
  }

  return { count, increment, decrement }
})
