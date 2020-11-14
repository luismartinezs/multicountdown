// Storage-agnostic adapter. Created because I may use indexedDB or some other data storage solution eventually
// imports
import data from '@/mock/data.json'

// constants
const defaultTimer = {
  label: 'One week timer',
  startCountdown: 1604628557717,
  endTime: 1605253357717
}

export default function Mock () {
  // private vars (internal state)
  let { timers } = data || []

  // getters
  function getTimers () {
    return timers
  }

  function getTimer (id) {
    return timers.find(timer => timer.id === id) || null
  }

  // setters
  function createTimer (options = {}) {
    _validateOptions(options)

    const timer = { ...defaultTimer, ...options, id: _generateId() }
    timers.push(timer)
    return timer
  }

  function updateTimer (id, options) {
    _validateOptions(options)

    // get timer index
    const index = _getIndexById(id)

    if (!index) {
      throw new Error(`function updateTimer: timer with id ${id} not found`)
    }
    // directly edit the timer object inside timers
    timers[index] = { ...timers[index], ...options }
    return timers[index]
  }

  function deleteTimer (id) {
    // find timer by id
    // get the index of that timer
    const index = _getIndexById(id)

    if (!index) {
      throw new Error(`function deleteTimer: timer with id ${id} not found`)
    }
    // slice out that one
    const deletedTimer = timers[index]
    timers = _deleteTimerByIndex(index)
    // return the deleted timer
    return deletedTimer
  }

  // functions
  function _generateId () {
    return _getLargestId() + 1
  }

  function _getLargestId () {
    return timers.reduce((largestId, timer) => {
      if (timer.id > largestId) {
        largestId = timer.id
      }
      return largestId
    }, 0)
  }

  function _getIndexById (id) {
    let timerIndex
    timers.forEach((timer, index) => {
      if (timer.id === id) {
        timerIndex = index
      }
    })
    return timerIndex
  }

  function _deleteTimerByIndex (index) {
    return timers.slice(0, index).concat(timers.slice(index + 1, timers.length))
  }

  function _validateOptions (options) {
    if (options) {
      const invalidKey = Object.keys(options).find(
        key => !Object.keys(defaultTimer).includes(key)
      )

      if (invalidKey) {
        throw new Error(`function createTimer: invalid property ${invalidKey}`)
      }
    }
  }

  return {
    getTimers,
    getTimer,
    createTimer,
    updateTimer,
    deleteTimer
  }
}
