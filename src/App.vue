<template>
  <div
    id="app"
    class="text-gray-100 bg-black min-h-screen flex flex-col"
  >
    <TheHeader class="z-50" />
    <TheDrawerMenu class="z-40" />
    <LDefault>
      <router-view />
    </LDefault>
  </div>
</template>

<script>
import LDefault from '@/layouts/LDefault.vue'
import TheHeader from '@/components/TheHeader.vue'
import TheDrawerMenu from '@/components/TheDrawerMenu.vue'

export default {
  name: 'App',
  components: { LDefault, TheHeader, TheDrawerMenu }
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
