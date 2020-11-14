import data from '@/mock/data.json'

export function MakeMockData () {
  const newData = JSON.parse(JSON.stringify(data))
  this.timers = newData.timers
}
