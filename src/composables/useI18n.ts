import type { VNode } from 'vue'

import { useTranslation } from 'i18next-vue'
import { Fragment, cloneVNode, createVNode, h, isVNode } from 'vue'

/**
 * Custom i18n composable
 * @example
 * ```tsx
 * const { t } = useI18n()
 *
 * const hello = t("hello", {
 *   bold: text => <span class="font-bold">{text}</span>,
 *   blue: <span class="text-blue" />,
 *   name: "John"
 * })
 * ```
 */
export function useI18n() {
  const { t, i18next } = useTranslation()

  function tFunc(key: string): string
  function tFunc(
    key: string,
    data: Record<string, ((text: string) => VNode) | VNode | JSX.Element | string>,
  ): VNode
  function tFunc(
    key: string,
    data?: Record<string, ((text: string) => VNode) | VNode | JSX.Element | string>,
  ) {
    if (!data) return t(key)

    // text => <span class="text-blue">{text}</span>
    const fnData = new Map<string, (text: string) => VNode>()
    // <span class="text-blue" />
    const vnodeData = new Map<string, VNode>()
    const originData = {} as Record<string, string>

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'function') {
        fnData.set(key, value)
      } else if (isVNode(value)) {
        vnodeData.set(key, value)
      } else {
        originData[key] = value
      }
    }

    // no custom render
    if (fnData.size === 0 && vnodeData.size === 0) return t(key, originData)

    const text = t(key, originData)

    const regex = /<(\w+)>(.*?)<\/\1>|{{(\w+)}}/g
    const result: (VNode | string)[] = []
    let lastIndex = 0

    for (const matched of text.matchAll(regex)) {
      if (matched.index === undefined) continue
      /**
       * 0: full match, e.g. "<tagName>content</tagName>" or "{{variable}}"
       * 1: tag name, e.g. "tagName"
       * 2: tag content, e.g. "content"
       * 3: variable, e.g. "variable"
       */
      const [full, tagName, tagContent, variable] = matched

      // text between the last match and this one
      const before = text.slice(lastIndex, matched.index)
      // push everything between the last match and this one
      if (before) result.push(before)

      // update the index of the last match
      lastIndex = matched.index + full.length

      // <tagName>content</tagName>
      if (tagName) {
        const render = fnData.get(tagName) ?? vnodeData.get(tagName)
        result.push(getRendered(render, tagContent!))
      }

      // {{variable}}
      else if (variable) {
        const vnode = vnodeData.get(variable)
        result.push(vnode ? cloneVNode(vnode) : full)
      }
    }

    // push everything after the last match
    const textLeft = text.slice(lastIndex)
    if (textLeft) result.push(textLeft)

    return h(Fragment, result)
  }

  return {
    t: tFunc,
    i18next,
  }
}

/**
 * Get rendered content
 */
function getRendered(render: ((content: string) => VNode) | VNode | undefined, content: string) {
  if (!render) return content
  if (typeof render === 'function') return render(content)
  return createVNode(render, null, content)
}
