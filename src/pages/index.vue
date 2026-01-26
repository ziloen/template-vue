<template>
  <div class="flex flex-col items-center">
    <!-- <SvgIcon name="favicon" class="text-50px text-blue" /> -->

    <Counter :initial="0" />

    <div>
      <testMsg />
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import Counter from '~/components/Counter.vue'
import { useI18n } from '~/composables'

const { t } = useI18n()

const testMsg = t('useI18nTest', {
  link: h('a', {
    class: 'text-blue',
    href: 'https://vuejs.org',
    target: '_blank',
    rel: 'noopener noreferrer',
  }),
  // name: 'useI18nTest'
  name: h('span', { class: 'text-green' }, 'Dynamic Name'),
})
</script>

<style scoped></style>

<!-- json / json5 / yaml -->
<route lang="json">
{
  "meta": {
    "requiresAuth": false
  }
}
</route>
