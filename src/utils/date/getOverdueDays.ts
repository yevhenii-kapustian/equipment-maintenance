export function getOverdueDays(schedule: string | null): number {
  if (!schedule) return 0

  const today = new Date()
  const scheduleDate = new Date(schedule)

  const diffTime = today.getTime() - scheduleDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  return diffDays > 0 ? diffDays : 0
}