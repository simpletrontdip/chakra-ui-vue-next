import {
  computed,
  CSSProperties,
  HTMLAttributes,
  Ref,
  ref,
  watch,
  watchEffect,
} from 'vue'
import {
  createPopper,
  VirtualElement,
  Options as PopperOptions,
  Modifier,
  Instance,
  popper,
} from '@popperjs/core'
import { fromEntries } from '@chakra-ui/vue-utils'
import { dequal as deepequal } from 'dequal'

export interface Options extends Partial<PopperOptions> {
  enabled: boolean
}

const EMPTY_MODIFIERS: any[] = []

/** Popper state */
type PopperState = {
  styles: {
    [key: string]: Partial<CSSStyleDeclaration>
  }
  attributes: {
    [key: string]: { [key: string]: string | boolean }
  }
}

function usePopper(
  referenceElement: Element | VirtualElement,
  popperElement: HTMLElement,
  /** options should be reactive */
  options: Options
) {
  console.log({ referenceElement, popperElement })
  const optionsWithDefaults = computed(() => ({
    onFirstUpdate: options.onFirstUpdate,
    placement: options.placement || 'bottom',
    strategy: options.strategy || 'absolute',
    modifiers: options.modifiers || EMPTY_MODIFIERS,
  }))

  const styles = ref<PopperState['styles']>({
    popper: {
      position: optionsWithDefaults.value.strategy,
      left: '0',
      top: '0',
    },
  })

  const attributes = ref<PopperState['attributes']>({})

  const updateStateModifier = computed<Modifier<'updateState', any>>(() => ({
    name: 'updateState',
    enabled: true,
    phase: 'write',
    fn: ({ state }) => {
      styles.value = state.styles
      attributes.value = state.attributes
    },
    requires: ['computeStyles'],
  }))

  const popperOptions = computed(() => ({
    ...optionsWithDefaults.value,
    modifiers: [
      ...optionsWithDefaults.value.modifiers,
      updateStateModifier.value,
      { name: 'applyStyles', enabled: true },
    ],
  }))

  // Define popperInstance
  const popperInstance = ref<Instance | null>(null)

  // Set popperOptions to popperInstance
  // when popperOptions change
  watch(popperOptions, (newPopperOptions) => {
    if (popperInstance.value) {
      popperInstance.value.setOptions(newPopperOptions)
    }
  })

  watchEffect((onInvalidate) => {
    if (!options.enabled || !referenceElement || !popperElement) {
      return
    }

    popperInstance.value = createPopper(
      referenceElement,
      popperElement,
      popperOptions.value
    )

    onInvalidate(() => {
      popperInstance.value?.destroy()
      popperInstance.value = null
    })
  })

  watchEffect((onInvalidate) => {
    const id = requestAnimationFrame(() => {
      popperInstance.value?.forceUpdate()
    })

    onInvalidate(() => {
      cancelAnimationFrame(id)
    })
  })

  return {
    state: popperInstance.value?.state || null,
    styles,
    attributes,
    update: popperInstance.value?.update || null,
    forceUpdate: popperInstance.value?.forceUpdate || null,
  }
}

export default usePopper
