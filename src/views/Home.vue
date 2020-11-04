<template>
  <div class="home">
    <CountdownTimer />
  </div>
</template>

<script>
// @ is an alias to /src
import CountdownTimer from '@/components/CountdownTimer.vue'

export default {
  name: 'Home',
  components: {
    CountdownTimer
  }
}
</script>
