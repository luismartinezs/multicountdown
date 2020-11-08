<template>
  <header class="flex justify-between w-full bg-primary-500 text-primary-100 py-3 px-4">
    <div>
      <h1 class="text-sm uppercase font-semibold tracking-wider">
        Manytimer
      </h1>
    </div>
    <div @click="setMenuState(!isOpen)">
      <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
        <path
          v-if="isOpen"
          fill-rule="evenodd"
          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
        />
        <path
          v-if="!isOpen"
          fill-rule="evenodd"
          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
        />
      </svg>
    </div>
  </header>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('menu')

export default {
  name: 'TheHeader',
  computed: mapState(['isOpen']),
  methods: mapMutations(['setMenuState'])
}
</script>
