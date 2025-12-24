import { useI18n } from '~/composables'

type Props = {
  size?: number
}

// TODO: v-modal, defineExpose, emit

const JsxExample1 = defineComponent<Props>({
  name: 'JsxExample1',
  setup(props, { emit, slots, expose }) {
    const counter = ref(0)
    const show = ref(false)
    const el = ref<HTMLDivElement | null>(null)

    onMounted(() => {
      console.log('TSX Mounted')
      console.log('element ref', el.value)
    })

    return () => {
      return (
        <div ref={el} class="flex-align flex-col gap-2">
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
    }
  },
})

const JsxExample2 = defineComponent((props: Props, { emit, expose, slots, attrs }) => {
  const counter = ref(0)
  const inputVal = ref('test')
  const show = ref(false)
  const el = ref<HTMLDivElement | null>(null)
  const { t } = useI18n()

  onMounted(() => {
    console.log('TSX Example2 Mounted')
    console.log('element ref', el.value)
  })

  onUnmounted(() => {
    console.log('TSX Example2 Unmounted')
  })

  expose({
    counter,
  })

  return () => (
    <div ref={el} class="flex-align flex-col gap-2">
      <div>{counter.value}</div>
      <input class="text-black" type="text" v-model={inputVal.value} />
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

      <p>{t('contactUsLink', { link: <span class="text-blue-4" /> })}</p>
      <p>{t('hello', { name: <span class="text-green">Dynamic Name</span> })}</p>
    </div>
  )
})

export default JsxExample2
