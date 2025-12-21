export function isDateOverdue(schedule: string | null): boolean {
  if (!schedule) return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const scheduleDate = new Date(schedule)
  scheduleDate.setHours(0, 0, 0, 0)

  return scheduleDate < today
}