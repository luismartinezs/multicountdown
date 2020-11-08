const state = {
  isOpen: false
}

const mutations = {
  setMenuState: (state, isOpen) => (state.isOpen = isOpen)
}

export const menu = { namespaced: true, state, mutations }
