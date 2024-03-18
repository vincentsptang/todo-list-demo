import { test, expect } from 'vitest'
import { isSameYear, getDateGap, getRelativeDateTemporalName } from '../date'

const now = new Date()

test('test get relative date temporal name', () => {
  const today = now
  expect(getRelativeDateTemporalName(today, now)).toBe('今天')

  const yesterday = new Date()
  yesterday.setDate(now.getDate() - 1)
  expect(getRelativeDateTemporalName(yesterday, now)).toBe('昨天')

  const dayBeforeYesterday = new Date()
  dayBeforeYesterday.setDate(now.getDate() - 2)
  expect(getRelativeDateTemporalName(dayBeforeYesterday, now)).toBe('前天')

  const threeDaysBefore = new Date()
  threeDaysBefore.setDate(now.getDate() - 3)
  expect(getRelativeDateTemporalName(threeDaysBefore, now)).toBeNull()

  const tomorrow = new Date()
  tomorrow.setDate(now.getDate() + 1)
  expect(getRelativeDateTemporalName(tomorrow, now)).toBe('明天')

  const dayAfterTomorrow = new Date()
  dayAfterTomorrow.setDate(now.getDate() + 2)
  expect(getRelativeDateTemporalName(dayAfterTomorrow, now)).toBe('后天')

  const threeDaysLater = new Date()
  threeDaysLater.setDate(now.getDate() + 3)
  expect(getRelativeDateTemporalName(threeDaysLater, now)).toBeNull()
})

test('test is the same year', () => {
  const sameYearTarget = new Date()

  expect(isSameYear(sameYearTarget, now)).toBeTruthy()
  expect(isSameYear(sameYearTarget.getTime(), now.getTime())).toBeTruthy()

  const yearBeforeTarget = new Date().setFullYear(now.getFullYear() - 1)
  expect(isSameYear(yearBeforeTarget, now)).toBeFalsy()
  expect(isSameYear(yearBeforeTarget, now.getTime())).toBeFalsy()

  const yearAfterTarget = new Date().setFullYear(now.getFullYear() + 1)
  expect(isSameYear(yearAfterTarget, now)).toBeFalsy()
  expect(isSameYear(yearAfterTarget, now.getTime())).toBeFalsy()
})

test('test get date gap', () => {
  const yesterday = new Date()
  yesterday.setDate(now.getDate() - 1)

  const tomorrow = new Date()
  tomorrow.setDate(now.getDate() + 1)

  expect(getDateGap(yesterday, now)).toBe(-1)
  expect(getDateGap(tomorrow, now)).toBe(1)
})
