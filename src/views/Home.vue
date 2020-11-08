<template>
  <div class="home">
    <TimerCards />
  </div>
</template>

<script>
// @ is an alias to /src
import TimerCards from '@/components/TimerCards.vue'

export default {
  name: 'Home',
  components: {
    TimerCards
  }
}
</script>
