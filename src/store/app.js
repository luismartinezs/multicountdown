const state = {
  updateCookies: false
}

const mutations = {
  setUpdateCookies: state => (state.updateCookies = true)
}

export const app = { namespaced: true, state, mutations }
