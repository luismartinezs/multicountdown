<template>
  <div
    id="app"
    class="text-gray-100 bg-gray-800 min-h-screen flex flex-col"
  >
    <TheHeader class="z-50" />
    <TheDrawerMenu class="z-40" />
    <LDefault>
      <router-view />
    </LDefault>
    <CookiesModal class="z-30" />
  </div>
</template>

<script>
import LDefault from '@/layouts/LDefault.vue'
import TheHeader from '@/components/TheHeader.vue'
import TheDrawerMenu from '@/components/TheDrawerMenu.vue'
import CookiesModal from '@/components/CookiesModal.vue'
import { ACCEPT_GA_TRACKING } from '@/constant.js'
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('app')

const isLocal = /localhost/.test(window.location.href)

const addGtmScript = () => {
  const gtmScript = document.createElement('script')
  const gtmScriptPlaceholder = document.getElementById('gtmScriptPlaceholder')
  gtmScript.async = true
  gtmScript.setAttribute(
    'src',
    'https://www.googletagmanager.com/gtag/js?id=G-YH4V9TKYRJ'
  )
  gtmScriptPlaceholder.replaceWith(gtmScript)
}

const addGoogleAnalyticsScript = () => {
  const gaScript = document.createElement('script')
  const gaScriptPlaceholder = document.getElementById('gaScriptPlaceholder')
  gaScript.text = `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-YH4V9TKYRJ');`
  gaScriptPlaceholder.replaceWith(gaScript)
}

const deleteScriptPlaceholders = () => {
  const placeholders = Array.from(
    document.querySelectorAll('[id$=Placeholder]')
  )
  placeholders.forEach(el => el.remove())
}

export default {
  name: 'App',
  components: { LDefault, TheHeader, TheDrawerMenu, CookiesModal },
  computed: mapState(['updateCookies']),
  methods: {
    handleScripts () {
      if (isLocal) {
        return deleteScriptPlaceholders()
      }
      if (localStorage.getItem(ACCEPT_GA_TRACKING) === 'true') {
        addGtmScript()
        addGoogleAnalyticsScript()
      }
      if (localStorage.getItem(ACCEPT_GA_TRACKING) === 'false') {
        deleteScriptPlaceholders()
      }
    }
  },
  mounted () {
    this.handleScripts()
  },
  watch: {
    updateCookies () {
      this.handleScripts()
    }
  }
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
