<template>
  <div class="home">
    <EditTimerModal v-if="false"/>
    <TimerCards :key="key" />
    <div class="flex justify-center mt-2">
      <button
        @click="addTimer"
        class="btn btn-darker rounded-full h-16 w-16 p-0 my-0 mx-1"
      >
        <span class="text-4xl font-bold">+</span>
      </button>
      <button
        @click="deleteTimer"
        class="btn btn-darker rounded-full h-16 w-16 p-0 my-0 mx-1"
      >
        <span class="text-4xl font-bold">-</span>
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TimerCards from '@/components/TimerCards.vue'
import EditTimerModal from '@/components/EditTimerModal.vue'
// import HandleLocalStorage from '@/helpers/handleLocalStorage.js'
import handleStorage from '@/storage/storage.js'
// import duration from '@/helpers/duration.js'

const { createTimer, deleteLastTimer } = handleStorage()
// const { week } = duration

export default {
  name: 'Home',
  data () {
    return {
      key: 0
    }
  },
  components: {
    TimerCards,
    EditTimerModal
  },
  methods: {
    addTimer () {
      this.addOneWeekTimer()
    },
    addOneWeekTimer () {
      createTimer({
        label: 'One week timer',
        endTime: 1605393439198,
        startCountdown: Date.now()
      })
      this.key++
    },
    deleteTimer () {
      deleteLastTimer()
      this.key++
    }
  }
}
</script>
