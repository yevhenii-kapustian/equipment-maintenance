'use client'

import { useEffect, useState } from "react"
import { getAddedEquipmentLast30Days } from "@/actions/EquipmentPostsItem/get-added-last-30-days"
import { MoveUp } from "lucide-react"

const EquipmentChanges = ({equipmentsAmount}: {equipmentsAmount: number}) => {
    const [addedCount, setAddedCount] = useState<number | null>(null)

    useEffect(() => {
        getAddedEquipmentLast30Days().then(setAddedCount)
    }, [])

    if (addedCount === null) return null

    return (
        <div className="max-w-70 mt-10 rounded-xl border border-[#2a005016] shadow-xl p-5 bg-[#F8F8F8] space-y-3">
            <h2 className="text-xl font-semibold">
                Всього Обладнань
            </h2>

            <p className="text-5xl font-bold">{equipmentsAmount}</p>

            <p className="flex items-center text-sm text-[#21C45D]">
                <MoveUp strokeWidth={3} size={15} /> {addedCount} цього місяця
            </p>
        </div>
    )
}

export default EquipmentChanges