// imports

// constants

export default function LocalStorageHandler () {
  // private vars (internal state)
  const key = 'manytimer_data'
  let timers = []

  function getTimers () {
    _fetchTimers()
    return timers
  }

  function getTimer (id) {
    _fetchTimers()
    return timers.find(timer => timer.id === id) || null
  }

  function createTimer (options = {}) {
    _validateOptions(options)

    const timer = { ...options, id: _generateId() }
    timers.push(timer)
    _saveTimers()
    return timer
  }

  function updateTimer (id, options) {
    _validateOptions(options)
    const index = _getIndexById(id)

    if (!index) {
      throw new Error(`function updateTimer: timer with id ${id} not found`)
    }

    timers[index] = { ...timers[index], ...options }
    _saveTimers()
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
    _saveTimers()
    // return the deleted timer
    return deletedTimer
  }

  // functions
  function _generateId () {
    return _getLargestId() + 1
  }

  function _getLargestId () {
    _fetchTimers()
    return timers.reduce((largestId, timer) => {
      if (timer.id > largestId) {
        largestId = timer.id
      }
      return largestId
    }, 0)
  }

  function _fetchTimers () {
    let data = localStorage.getItem(key)
    if (!data) {
      _saveTimers()
      data = localStorage.getItem(key)
    }
    timers = data.timers
    return timers
  }

  function _saveTimers () {
    const data = { timers }
    localStorage.setItem(key, JSON.stringify(data))
  }

  function _getIndexById (id) {
    let timerIndex
    _fetchTimers()
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
    const validKeys = ['label', 'startCountdown', 'endTime']

    if (options) {
      const invalidKey = Object.keys(options).find(key =>
        validKeys.includes(key)
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
