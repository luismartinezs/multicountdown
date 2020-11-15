<template>
  <div
    class="flex flex-col justify-around items-center leading-tight bg-gray-900 p-4 rounded-xl"
  >
    <div class="flex flex-col text-center">
      <div class="flex justify-between">
        <button
          @click="deleteTimer"
          class="text-base font-semibold hover:text-primary-200"
        >
          <TrashIcon
            class="stroke-current text-gray-600 hover:text-primary-200 w-5 h-5"
          />
        </button>
        <h2 class="text-gray-600 text-lg whitespace-normal w-24 mx-2">
          {{ timer.label }}
        </h2>
        <div class="w-5 h-5"></div>
      </div>
    </div>
    <countdown :time="time" class="mt-2">
      <template slot-scope="props"
        ><span class="text-primary-400 text-3xl"
          >{{ props.totalHours }}:{{ props.minutes | timeFormat }}:{{
            props.seconds | timeFormat
          }}</span
        ></template
      >
    </countdown>
    <div class="flex justify-around mt-2 text-gray-600 w-full">
      <button
        @click="resetTimer"
        class="text-base font-semibold hover:text-primary-200"
      >
        <RefreshIcon class="stroke-current hover:text-primary-200 w-5 h-5" />
      </button>
      <button
        @click="addHours(1)"
        class="ml-3 text-2xl font-semibold hover:text-primary-200"
      >
        +1h
      </button>
    </div>
  </div>
</template>

<script>
import handleStorage from '@/storage/storage.js'
import TrashIcon from '@/components/TrashIcon.vue'
import RefreshIcon from '@/components/RefreshIcon.vue'

const { updateTimer, deleteTimer } = handleStorage()

export default {
  name: 'TimerCard',
  props: ['timer', 'index'],
  components: {
    TrashIcon,
    RefreshIcon
  },
  data () {
    return {
      time: 0,
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
      this.time = Math.max(this.endTime - Date.now(), 0)
    },
    setEndTime () {
      const options = {
        ...this.timer,
        endTime: this.endTime
      }
      updateTimer(this.timer.id, options)
    },
    resetTimer () {
      this.endTime = Date.now() + this.timer.startCountdown
      this.setEndTime()
      this.handleTime()
    },
    deleteTimer () {
      deleteTimer(this.timer.id)
      this.$emit('delete-timer')
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
