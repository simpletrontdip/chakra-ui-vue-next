/**
 * Hey! Welcome to @chakra-ui/vue-next VueScrollLock
 *
 * Directive to enable and disble body scrolling
 *
 * @see Docs     https://next.vue.chakra-ui.com/vue-scroll-lock
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/vue-scroll-lock/src/vue-scroll-lock/vue-scroll-lock.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { h, defineComponent, PropType } from 'vue'
import { chakra, DOMElements } from '@chakra-ui/vue-system'

export const VueScrollLock = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: 'div',
    },
  },
  setup(props, { slots, attrs }) {
    return () => h(chakra(props.as), { ...attrs }, slots)
  },
})
