import { createDiscreteApi, darkTheme } from 'naive-ui'

const { message, notification, loadingBar } = createDiscreteApi(
  ['loadingBar', 'notification', 'message'],
  {
    configProviderProps: {
      theme: darkTheme,
    },
  },
)

export { message, notification, loadingBar }
