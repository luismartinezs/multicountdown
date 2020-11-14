// Storage-agnostic adapter. Created because I may use indexedDB or some other data storage solution eventually
// imports
// import Mock from './mock.js'
import LocalStorageHandler from './localStorage.js'

// constants
// const mock = Mock()

const store = LocalStorageHandler()

export default function handleStorage () {
  // private vars (internal state)

  // getters
  function getTimers () {
    return store.getTimers()
  }

  function getTimer (id) {
    return store.getTimer(id)
  }

  // setters
  function createTimer (options) {
    return store.createTimer(options)
  }

  function updateTimer (id, options) {
    return store.updateTimer(id, options)
  }

  function deleteTimer (id) {
    return store.deleteTimer(id)
  }

  function deleteLastTimer () {
    const timers = store.getTimers()
    const lastTimerId = timers.slice(-1)[0].id
    return deleteTimer(lastTimerId)
  }

  // functions

  return {
    getTimers,
    getTimer,
    createTimer,
    updateTimer,
    deleteTimer,
    deleteLastTimer
  }
}
