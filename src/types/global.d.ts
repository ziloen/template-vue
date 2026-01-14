/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-var */
// @ts-nocheck
/**
 * @deprecated
 * use `import.meta.env.PROD` instead
 *
 * [Built-in constants](https://vite.dev/guide/env-and-mode.html#built-in-constants)
 */
declare const IS_PROD: boolean
/**
 * @deprecated
 * use `import.meta.env.DEV` instead
 *
 * [Built-in constants](https://vite.dev/guide/env-and-mode.html#built-in-constants)
 */
declare const IS_DEV: boolean
declare const IS_BUILD: boolean
// if you want variable available on globalThis / Window, use `var` instead of `const` or `let`
// if you need import variable, use `import("bar").foo` instead of `import { foo } from "bar"`
declare var __VUE__: boolean | undefined

interface ShadowRoot {
  /** [Can I use](https://caniuse.com/mdn-api_shadowroot_getselection) */
  getSelection?: () => Selection | null
}

interface NavigatorUABrandVersion {
  brand: string
  version: string
}

interface NavigatorUAData {
  brands: ReadonlyArray<NavigatorUABrandVersion>
  mobile: boolean
  platform: string

  // toJSON(): unknown
  // getHighEntropyValues(hints: string[]): Promise<unknown>
}

interface NavigatorID {
  /**
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/userAgentData)
   *
   * [Can I Use](https://caniuse.com/mdn-api_navigator_useragentdata)
   */
  userAgentData?: NavigatorUAData
}
