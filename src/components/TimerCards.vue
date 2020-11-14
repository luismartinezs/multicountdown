<template>
  <div v-if="timers && timers.length" class="text-gray-100 flex flex-wrap justify-center">
    <TimerCard
      v-for="(timer, index) in timers"
      :key="timer.id"
      :timer="timer"
      :index="index"
      class="m-1"
    />
  </div>
</template>

<script>
import TimerCard from '@/components/TimerCard.vue'
// import data from '@/mock/data.json'
import handleStorage from '@/storage/storage.js'

const { getTimers } = handleStorage()

export default {
  name: 'TimerCards',
  components: {
    TimerCard
  },
  data () {
    return {
      timers: null
    }
  },
  mounted () {
    this.timers = getTimers()
  }
}
</script>
