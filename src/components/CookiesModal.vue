<template>
  <transition appear name="slideFromBottom">
    <div
      v-if="showModal"
      class="mx-auto w-full absolute bottom-0 left-0 right-0 bg-primary-600 py-3 px-3 sm:px-16 md:px-32 lg:px-3 text-center"
    >
    <div class="flex flex-col place-items-center max-w-2xl mx-auto">
      <p class="text-primary-200">
        This website sends anonymous navigation data to Google Analytics. It
        helps me see how many people are using it and where they come from.
      </p>
      <div class="flex flex-col">
        <button
          @click.prevent="acceptTracking"
          class="btn btn-secondary bg-black normal-case mt-4"
        >
          OK
        </button>
        <div class="mt-2 sm:py-3 text-primary-200">
          <span
            @click.prevent="disallowTracking"
            class="normal-case underline text-sm cursor-pointer"
          >
            No. I don't want to send any anonymous data to Google Analytics
          </span>
        </div>
      </div>
    </div>
    </div>
  </transition>
</template>

<script>
import { ACCEPT_GA_TRACKING } from '@/constant.js'
import { createNamespacedHelpers } from 'vuex'

const { mapMutations } = createNamespacedHelpers('app')

export default {
  name: 'CookiesModal',
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    ...mapMutations(['setUpdateCookies']),
    acceptTracking () {
      localStorage.setItem(ACCEPT_GA_TRACKING, 'true')
      this.closeModal()
      this.setUpdateCookies()
    },
    disallowTracking () {
      localStorage.setItem(ACCEPT_GA_TRACKING, 'false')
      this.closeModal()
      this.setUpdateCookies()
    },
    closeModal () {
      this.showModal = false
    }
  },
  created () {
    if (!localStorage.getItem(ACCEPT_GA_TRACKING)) {
      this.showModal = true
    }
  }
}
</script>

<style scoped>
.slideFromBottom-enter,
.slideFromBottom-leave-to {
  transform: translate(0px, 12.5em);
}
.slideFromBottom-enter-to,
.slideFromBottom-leave {
  transform: translate(0px, 0px);
}
.slideFromBottom-enter-active,
.slideFromBottom-leave-active,
.slideFromTop-enter-active,
.slideFromTop-leave-active {
  transition: transform 0.4s ease-in;
}
</style>
