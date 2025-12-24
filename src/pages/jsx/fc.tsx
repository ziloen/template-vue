import type { SetupContext } from 'vue'

type Props = {
  size?: number
}

// render function, can not use state and lifetime inside
export default function FnComp({ size }: Props, { emit }: SetupContext<['onClick']>) {
  return (
    <div class="flex flex-col gap-2">
      <div onClick={() => emit('onClick')}>123</div>
      <div>345</div>
    </div>
  )
}
