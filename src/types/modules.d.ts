// Global JSX namespace
import 'vue/jsx'

// 修正 axios 返回类型
declare module 'axios' {
  interface AxiosRequestConfig {
    requestSchema?: import('zod').ZodType
    responseSchema?: import('zod').ZodType
  }
}

export {}
