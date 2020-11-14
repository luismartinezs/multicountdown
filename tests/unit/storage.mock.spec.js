import Mock from '@/storage/mock.js'
import { MakeMockData } from './helper.js'

const mock = Mock()
let timers

beforeEach(() => {
  const data = new MakeMockData()
  timers = data.timers
})

describe('getTimers', () => {
  it('gets timers', () => {
    expect(mock.getTimers()).toEqual(timers)
  })
})

describe('getTimer', () => {
  it('gets timer by id', () => {
    expect(mock.getTimer(1)).toEqual(timers[1])
  })

  it('Return null if id is not found', () => {
    expect(mock.getTimer(100)).toEqual(null)
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
    expect(mock.createTimer()).toEqual(newTimer)
    expect(mock.getTimer(3)).toEqual(newTimer)
  })

  it('Error if invalid options', () => {
    const options = {
      flamingo: 'pink'
    }
    expect(() => mock.createTimer(options)).toThrow()
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
    expect(mock.createTimer(options)).toEqual(expected)
  })

  it('If options contains id, it errors out', () => {
    const options = {
      id: 55,
      label: 'Custom timer',
      startCountdown: 1604628512345,
      endTime: 1605253367894
    }
    expect(() => mock.createTimer(options)).toThrow()
  })
})

describe('deleteTimer', () => {
  it('Deletes timer and returns it', () => {
    const timer = mock.getTimer(2)
    expect(mock.deleteTimer(2)).toEqual(timer)
    expect(mock.getTimer(2)).toEqual(null)
  })

  it('Error if attempting to delete a timer that does not exist', () => {
    expect(() => mock.deleteTimer(100)).toThrow()
  })
})

describe('updateTimer', () => {
  it('Updates timer and returns it', () => {
    const id = 1
    const timer = mock.getTimer(id)
    expect(mock.deleteTimer(id)).toEqual(timer)
    expect(mock.getTimer(id)).toEqual(null)
  })

  it('Error if attempting to update a timer that does not exist', () => {
    expect(() => mock.updateTimer(100, {})).toThrow()
  })

  it('Attempting to update id errors out', () => {
    const options = {
      id: 55,
      label: 'Custom timer',
      startCountdown: 1604628512345,
      endTime: 1605253367894
    }
    expect(() => mock.updateTimer(1, options)).toThrow()
  })

  it('Error if invalid options', () => {
    const options = {
      flamingo: 'pink'
    }
    expect(() => mock.updateTimer(1, options)).toThrow()
  })
})
