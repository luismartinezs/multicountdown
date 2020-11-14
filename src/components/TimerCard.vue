<template>
  <div class="leading-tight bg-gray-900 p-4 rounded-xl">
    <div class="flex flex-col text-center">
      <h2 class="text-gray-600 text-lg">{{ timer.label }}</h2>
      <countdown :time="time" class="mt-1">
        <template slot-scope="props"
          ><span class="text-primary-400 text-3xl"
            >{{ props.totalHours }}:{{ props.minutes | timeFormat }}:{{
              props.seconds | timeFormat
            }}</span
          ></template
        >
      </countdown>
    </div>
    <div class="flex justify-center mt-1">
      <button
        @click="addHours(1)"
        class="text-2xl font-semibold hover:text-primary-200"
      >
        +1h
      </button>
    </div>
  </div>
</template>

<script>
import handleStorage from '@/storage/storage.js'

const { updateTimer } = handleStorage()

export default {
  name: 'TimerCard',
  props: ['timer', 'index'],
  data () {
    return {
      time: null,
      id: null, // unique value
      label: null, // text on display
      startCountdown: null, // n of ms that timer initially lasted
      endTime: null, // timestamp where timer will reach 0
      ONE_WEEK: 604800000,
      ONE_HOUR: 3600000
    }
  },
  filters: {
    timeFormat (val) {
      return ('0' + val).slice(-2)
    }
  },
  methods: {
    addHours (n) {
      this.endTime += n * this.ONE_HOUR
      this.setEndTime()
      this.handleTime()
    },
    handleTime () {
      this.time = this.endTime - Date.now()
    },
    setEndTime () {
      const options = {
        ...this.timer,
        endTime: this.endTime
      }
      updateTimer(this.timer.id, options)
    }
  },
  mounted () {
    if (this.timer.endTime) {
      this.endTime = this.timer.endTime
    } else {
      this.endTime = Date.now() + this.ONE_WEEK
      this.setEndTime()
    }
    this.handleTime()
  }
}
</script>
