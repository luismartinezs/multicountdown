<template>
  <div v-if="data" class="text-gray-100 flex flex-wrap justify-center">
    <TimerCard
      v-for="(timer, index) in data.timers"
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
import HandleLocalStorage from '@/helpers/handleLocalStorage.js'

const { getData } = HandleLocalStorage()

export default {
  name: 'TimerCards',
  components: {
    TimerCard
  },
  data () {
    return {
      data: null
    }
  },
  mounted () {
    this.data = getData()
  }
}
</script>
