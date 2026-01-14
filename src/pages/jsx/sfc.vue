<script lang="tsx">
export default defineComponent((props, { slots, emit, expose }) => {
  const a = ref(false)

  return () => (
    <div class="tsx-sfc">
      <div v-if={a.value}>v-if Test</div>
      <button onClick={() => (a.value = !a.value)}>Show</button>
    </div>
  )
})
</script>

<style scoped>
.tsx-sfc {
  color: red;
}
</style>
