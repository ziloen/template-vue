type Props = {
  size?: number
}

export default defineComponent<Props>(({ size }, context) => {
  const counter = ref(0)
  const show = ref(false)
  const el = ref<HTMLDivElement | null>(null)

  onMounted(() => {
    console.log('TSX Mounted')
    console.log('element ref', el.value)
  })

  return () => (
    <div ref={el} class="flex flex-col gap-2">
      <div>{counter.value}</div>
      <div>
        <button class="btn" onClick={() => counter.value++}>
          +1
        </button>
      </div>
      <div>
        <button type="button" class="btn" onClick={() => (show.value = !show.value)}>
          Toggle
        </button>
      </div>
      <div v-show={show.value}>v-show test</div>
      {show.value ? <div>JSX condition render</div> : null}

      <p>`v-if` & `v-on/@` & `v-for` is not supported</p>
    </div>
  )
})
