/**
 * Get target date relative name according to comparison date
 * @param targetDate Date
 * @param comparisonDate NUMBER date used to compare with target date
 * @returns STRING date name or NULL
 */
export function getRelativeDateTemporalName(targetDate: Date, comparisonDate: Date): string | null {
  const dateDiff = getDateGap(targetDate, comparisonDate)

  const names = ['今天']

  if (dateDiff > 0) {
    names.push('明天', '后天')
  } else {
    names.push('昨天', '前天')
  }

  const absDateDiff = Math.abs(dateDiff)
  if (absDateDiff < names.length) {
    return names[absDateDiff]
  } else {
    return null
  }
}

/**
 * Purpose: determine the time stamp or Date instance passed in is the same year.
 * @param target NUMBER
 * @param comparison timestamp or Date instance used to compare target
 * @returns Boolean true for same year, false for different year.
 */
export function isSameYear(target: number | Date, comparison: typeof target): boolean {
  if (target instanceof Date && comparison instanceof Date) {
    return target.getFullYear() - comparison.getFullYear() === 0
  } else {
    return new Date(target).getFullYear() - new Date(comparison).getFullYear() === 0
  }
}

/**
 * Get the gap between two dates.
 * @param target
 * @param comparison
 * @returns NUMBER the gap between two dates.
 */
export function getDateGap(target: Date, comparison: Date): number {
  return target.getDate() - comparison.getDate()
}
