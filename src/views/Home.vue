<template>
  <div class="home">
    <EditTimerModal
      v-show="showEditTimerModal"
      @close-modal="onCloseModal"
    />
    <TimerCards :key="key" @delete-timer="refreshKey" />
    <div class="flex justify-center mt-2">
      <button
        @click="showEditTimerModal = !showEditTimerModal"
        class="btn btn-darker rounded-full h-16 w-16 p-0 my-0 mx-1"
      >
        <span class="text-4xl font-bold">+</span>
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TimerCards from '@/components/TimerCards.vue'
import EditTimerModal from '@/components/EditTimerModal.vue'

// const { week } = duration

export default {
  name: 'Home',
  data () {
    return {
      key: 0,
      showEditTimerModal: false
    }
  },
  components: {
    TimerCards,
    EditTimerModal
  },
  methods: {
    refreshKey () {
      this.key = Math.floor(Math.random() * 10000)
    },
    onCloseModal () {
      this.showEditTimerModal = false
      this.refreshKey()
    }
  }
}
</script>
