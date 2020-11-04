<template>
  <div class="leading-tight text-xl">
    <div class="my-auto flex flex-col text-center">
      <h1>One week timer</h1>
      <countdown :time="time">
        <template slot-scope="props"
          ><span class="text-8xl"
            >{{ props.totalHours }}:{{ props.minutes | timeFormat }}:{{
              props.seconds | timeFormat
            }}</span
          ></template
        >
      </countdown>
    </div>
    <div class="flex flex-col">
      <button @click="addHours(1)" class="btn btn-primary py-6">+1 hour</button>
      <button
        @click="resetToMs(ONE_WEEK)"
        class="btn btn-secondary py-6"
      >
        Reset to one week
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountdownTimer',
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
