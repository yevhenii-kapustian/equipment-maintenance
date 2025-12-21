'use client'

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/browser-client"
import { getEquipmentWithDetails } from "@/utils/supabase/queries"
import { isDateOverdue } from "@/utils/date/isDateOverdue"

const ExpiredEquipment = () => {
  const [overdueCount, setOverdueCount] = useState<number | null>(null)

  useEffect(() => {
    const fetchOverdue = async () => {
      const supabase = createClient()
      const { data } = await getEquipmentWithDetails(supabase)
      const count = data?.flatMap(item => item.equipment_details).filter(detail => isDateOverdue(detail.schedule)).length ?? 0

      setOverdueCount(count)
    }

    fetchOverdue()
  }, [])

  if (overdueCount === null) {
    return (
      <div className="mt-10 rounded-xl border p-5 bg-[#F8F8F8] animate-pulse space-y-3">
        <div className="h-5 w-40 bg-gray-300 rounded" />
        <div className="h-10 w-20 bg-gray-300 rounded" />
      </div>
    )
  }

  return (
    <div className="mt-10 rounded-xl border border-[#2a005016] shadow-xl p-5 bg-[#F8F8F8] space-y-3">
      <h2 className="text-xl font-semibold">
        Прострочене обслуговування
      </h2>

      <p className={`${overdueCount === 0 ? "text-black" : "text-red-600"} text-4xl font-bold`}>{overdueCount}</p>
    </div>
  )
}

export default ExpiredEquipment