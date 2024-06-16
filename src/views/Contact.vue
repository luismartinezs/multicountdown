<template>
  <div class="mx-12 text-lg text-gray-400 text-left h-full my-6">
    <p>
      Found a bug? Have an idea? Wanna say hello?
      <a
        href="mailto:luismartinezwebdev@gmail.com"
        alt="my email"
        class="underline text-gray-600 hover:text-gray-400"
        >luismartinezwebdev@gmail.com</a
      >
    </p>
    <p>
      I created this app to help me set long persistent countdowns.
    </p>
    <p>
      The official android clock app behaves strangely when setting many hours
      long countdowns. This app allows up to 999 hours countdown.
    </p>
    <div class="text-right text-base mt-4">
      <a href="https://www.webdevluis.com/" class="underline" target="_blank"
        >Luis Martinez 2020</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact'
}
</script>

<style scoped>
p:not(:first-child) {
  margin-top: 1rem;
}
</style>
