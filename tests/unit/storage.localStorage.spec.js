import LocalStorageHandler from '@/storage/localStorage.js'
import data from '@/mock/data.json'
import { LocalStorageMock } from './LocalStorageMock.js'

global.localStorage = new LocalStorageMock()

const store = LocalStorageHandler()
const key = 'manytimer_data'
const { timers } = data

beforeEach(() => {
  localStorage.setItem(key, JSON.stringify(data))
})

describe('getTimers', () => {
  it('gets timers', () => {
    expect(store.getTimers()).toEqual(timers)
  })
})

describe('getTimer', () => {
  it('gets timer by id', () => {
    expect(store.getTimer(1)).toEqual(timers[1])
  })

  it('Return null if id is not found', () => {
    expect(store.getTimer(100)).toEqual(null)
  })
})

describe('createTimer', () => {
  it('creates timer with default options and returns it', () => {
    const newTimer = {
      id: 3,
      label: 'One week timer',
      startCountdown: 1604628557717,
      endTime: 1605253357717
    }
    expect(store.createTimer()).toEqual(newTimer)
    expect(store.getTimer(3)).toEqual(newTimer)
  })

  it('Error if invalid options', () => {
    const options = {
      flamingo: 'pink'
    }
    expect(() => store.createTimer(options)).toThrow()
  })

  it('Create timer with custom options', () => {
    const options = {
      label: 'Custom timer',
      startCountdown: 1604628512345,
      endTime: 1605253367894
    }
    const expected = {
      id: 4,
      label: 'Custom timer',
      startCountdown: 1604628512345,
      endTime: 1605253367894
    }
    expect(store.createTimer(options)).toEqual(expected)
  })

  it('If options contains id, it errors out', () => {
    const options = {
      id: 55,
      label: 'Custom timer',
      startCountdown: 1604628512345,
      endTime: 1605253367894
    }
    expect(() => store.createTimer(options)).toThrow()
  })
})

describe('deleteTimer', () => {
  it('Deletes timer and returns it', () => {
    const timer = store.getTimer(2)
    expect(store.deleteTimer(2)).toEqual(timer)
    expect(store.getTimer(2)).toEqual(null)
  })

  it('Error if attempting to delete a timer that does not exist', () => {
    expect(() => store.deleteTimer(100)).toThrow()
  })
})

describe('updateTimer', () => {
  it('Updates timer and returns it', () => {
    const id = 1
    const timer = store.getTimer(id)
    expect(store.deleteTimer(id)).toEqual(timer)
    expect(store.getTimer(id)).toEqual(null)
  })

  it('Error if attempting to update a timer that does not exist', () => {
    expect(() => store.updateTimer(100, {})).toThrow()
  })

  it('Attempting to update id errors out', () => {
    const options = {
      id: 55,
      label: 'Custom timer',
      startCountdown: 1604628512345,
      endTime: 1605253367894
    }
    expect(() => store.updateTimer(1, options)).toThrow()
  })

  it('Error if invalid options', () => {
    const options = {
      flamingo: 'pink'
    }
    expect(() => store.updateTimer(1, options)).toThrow()
  })
})
