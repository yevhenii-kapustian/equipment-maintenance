'use client'

import { useEffect, useState } from "react"
import { getAddedEquipmentLast30Days } from "@/actions/EquipmentPostsItem/get-added-last-30-days"
import { MoveUp } from "lucide-react"

const EquipmentChanges = ({ equipmentsAmount }: { equipmentsAmount: number }) => {
    const [addedCount, setAddedCount] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            const count = await getAddedEquipmentLast30Days()
            setAddedCount(count)
            setLoading(false)
        }

        load()
    }, [])

    if (loading) {
        return (
            <div className="mt-10 rounded-xl border p-5 bg-[#F8F8F8] animate-pulse space-y-3">
                <div className="h-5 w-40 bg-gray-300 rounded" />
                <div className="h-10 w-20 bg-gray-300 rounded" />
                <div className="h-4 w-32 bg-gray-300 rounded" />
            </div>
        )
    }

    return (
        <div className="mt-10 rounded-xl border border-[#2a005016] shadow-xl p-5 bg-[#F8F8F8] space-y-3">
            <h2 className="text-xl font-semibold">Всього Обладнань</h2>

            <p className="text-4xl font-bold">{equipmentsAmount}</p>

            <p className="flex items-center text-sm text-[#21C45D]">
                <MoveUp strokeWidth={3} size={15} /> {addedCount} цього місяця
            </p>
        </div>
    )
}

export default EquipmentChanges