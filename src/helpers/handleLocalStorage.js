const ONE_WEEK = 604800000

const defaultOptions = {
  key: 'manytimer_data',
  initData: {
    timers: []
  },
  initTimer: {
    label: 'Default timer',
    startCountdown: Date.now(),
    endTime: Date.now() + ONE_WEEK
  }
}

export default function HandleLocalStorage (options = {}) {
  options = Object.assign({}, defaultOptions, options)
  const { key, initData, initTimer } = options

  function _getLastId () {
    const data = getData()
    if (!data || !data.timers.length) {
      return -1
    }
    return data.timers.slice(-1)[0].id
  }

  function getData () {
    return JSON.parse(localStorage.getItem(key)) || null
  }

  function setData (data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  function setTimerData ({ timerData, index }) {
    const data = getData()
    data.timers[index] = timerData
    setData(data)
  }

  function addTimer (timerData = initTimer) {
    let data = getData()
    if (!data) {
      data = initData
    }
    const lastId = data.timers.length ? _getLastId() : 0
    const nextId = +lastId + 1
    data.timers.push({ ...timerData, id: nextId })
    setData(data)
  }

  function deleteTimerById (id) {
    const data = getData()
    const timers = data.timers.filter(timer => timer.id !== id)
    setData({ timers })
  }

  function deleteLastTimer () {
    const data = getData()
    const timers = data.timers.slice(0, -1)
    setData({ timers })
  }

  return {
    getData,
    setData,
    setTimerData,
    addTimer,
    deleteTimerById,
    deleteLastTimer
  }
}
