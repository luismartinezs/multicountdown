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
export default {
  name: 'CountdownTimer',
  props: ['timer'],
  data () {
    return {
      endTime: 0,
      time: 0,
      ONE_WEEK: 7 * 24 * 60 * 60 * 1000,
      ONE_HOUR: 60 * 60 * 1000
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
      window.localStorage.setItem('cdt_end_time', this.endTime)
    },
    resetToMs (ms) {
      this.endTime = Date.now() + ms
      this.setEndTime()
      this.handleTime()
    }
  },
  mounted () {
    const savedEndTime = +window.localStorage.getItem('cdt_end_time')
    if (savedEndTime) {
      this.endTime = savedEndTime
    } else {
      this.endTime = Date.now() + this.ONE_WEEK
      this.setEndTime()
    }
    this.handleTime()
  }
}
</script>
