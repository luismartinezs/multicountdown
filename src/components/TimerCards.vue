<template>
  <div class="text-gray-100 flex flex-wrap justify-center mx-2">
    <TimerCard
      v-for="timer in data.timers"
      :key="timer.id"
      :timer="timer"
      class="m-1"
    />
  </div>
</template>

<script>
import TimerCard from '@/components/TimerCard.vue'
import data from '@/mock/data.json'

export default {
  name: 'TimerCards',
  components: {
    TimerCard
  },
  data () {
    return {
      data: {}
    }
  },
  mounted () {
    // this.data = JSON.parse(window.localStorage.getItem('manytimer_data'))
    this.data = data
  }
}
</script>
