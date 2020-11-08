<template>
  <div
    :class="isOpen ? '' : 'hidden'"
    class="bg-primary-500 w-screen h-screen absolute flex flex-col items-center text-xl px-12 pt-20"
  >
    <ul>
      <li
        @click="setMenuState(false)"
        v-for="{ label, link, external } in menu"
        :key="label"
        class="mt-8 first:mt-0 underline text-white hover:text-primary-200"
      >
        <router-link v-if="!external" :to="link">{{ label }} </router-link>

        <a v-if="external" :href="link" target="_blank">
          <span>
            {{ label }}
          </span>

          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 w-6 inline-block"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('menu')

export default {
  name: 'TheDrawerMenu',
  data () {
    return {
      menu: [
        {
          label: 'Home',
          link: '/',
          external: false
        },
        {
          label: 'Contact',
          link: '/contact',
          external: false
        }
      ]
    }
  },
  computed: mapState(['isOpen']),
  methods: mapMutations(['setMenuState'])
}
</script>
