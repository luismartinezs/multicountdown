<template>
  <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
  <div class="fixed inset-0 z-10 overflow-hidden">
    <div class="flex items-center justify-center min-h-screen text-center">
      <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>
      <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
      <div
        class="bg-gray-600 rounded-lg text-left shadow-xl transform transition-all px-6 py-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div>
          <h3
            class="text-lg leading-6 font-medium text-gray-800 font-semibold"
            id="modal-headline"
          >
            Edit timer
          </h3>
        </div>
        <form class="pt-4 pb-4 flex flex-col" @submit.prevent="editTimer">
          <label for="label" class="block text-gray-300">
            <input
              id="label"
              type="text"
              maxlength="20"
              placeholder="Enter a name"
              class="input"
              v-model="label"
            />
          </label>
          <label for="days" class="mt-4 block">
            <input
              id="days"
              class="input w-24 text-center"
              type="number"
              max="999"
              min="0"
              v-model="days"
            />
            <span class="text-gray-800 inline-block ml-3 text-lg">days</span>
          </label>
          <label for="hours" class="mt-4 block">
            <input
              id="hours"
              class="input w-24 text-center"
              type="number"
              max="999"
              min="0"
              v-model="hours"
            />
            <span class="text-gray-800 inline-block ml-3 text-lg">hours</span>
          </label>
          <label for="minutes" class="mt-4 block">
            <input
              id="minutes"
              class="input w-24 text-center"
              type="number"
              max="59"
              min="0"
              v-model="minutes"
            />
            <span class="text-gray-800 inline-block ml-3 text-lg">minutes</span>
          </label>
        </form>
        <div class="flex justify-end">
          <button
            @click.prevent="onCancel"
            type="button"
            class="btn btn-dark-outline font-semibold"
          >
            Cancel
          </button>
          <button
          @click.prevent="onSave"
            type="button"
            class="btn btn-dark border border-gray-800 border-2 ml-2 font-bold px-6"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import handleStorage from '@/storage/storage.js'
import duration from '@/helpers/duration.js'

const { day, hour, minute } = duration

const { createTimer } = handleStorage()

export default {
  name: 'EditTimerModal',
  data () {
    return {
      label: '',
      days: 0,
      hours: 0,
      minutes: 0
    }
  },
  computed: {
    endTime () {
      return this.days * day + this.hours * hour + this.minutes * minute + Date.now()
    }
  },
  methods: {
    onCancel () {
      this.$emit('close-modal')
    },
    onSave () {
      createTimer({
        label: this.label,
        endTime: this.endTime,
        startCountdown: this.endTime - Date.now()
      })
      this.key++
      this.$emit('close-modal')
    }
  }
}
</script>
