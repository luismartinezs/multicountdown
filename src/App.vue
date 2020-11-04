<template>
  <div
    id="app"
    class="text-gray-100 bg-white h-screen flex flex-col justify-between"
  >
    <LDefault>
      <router-view />
    </LDefault>
  </div>
</template>

<script>
import LDefault from '@/layouts/LDefault.vue'

export default {
  name: 'App',
  components: { LDefault }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
