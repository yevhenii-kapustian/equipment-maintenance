'use client'

import { getEquipmentWithDetails } from "@/utils/supabase/queries"
import { createClient } from "@/utils/supabase/browser-client"
import { useEffect, useState } from "react"
import { MoveUp } from "lucide-react"

const ServiceDone = () => {
    const [servicesDone, setServicesDone] = useState<number | null>(null)
    const [servicesDoneLast30Days, setServicesDoneLast30Days] = useState<number | null>(null)

    useEffect(() => {
        const fetchServicesDone = async () => {
            const supabase = await createClient()
            const { data } = await getEquipmentWithDetails(supabase)

            const doneCount = data?.flatMap(item => item.equipment_details).filter(detail => detail.fact === "виконано").length ?? 0

            const thirtyDaysAgo = new Date()
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
            const doneLast30Days = data?.flatMap(item => item.equipment_details)
                                        .filter(detail => detail.fact === "виконано" && detail.schedule && new Date(detail.schedule) >= thirtyDaysAgo).length ?? 0

            setServicesDone(doneCount)
            setServicesDoneLast30Days(doneLast30Days)
        }
        fetchServicesDone()
    }, [])

    if (servicesDone === null || servicesDoneLast30Days === null) {
        return (
            <div className="rounded-xl border p-5 bg-[#F8F8F8] animate-pulse space-y-3">
                <div className="h-5 w-40 bg-gray-300 rounded" />
                <div className="h-10 w-20 bg-gray-300 rounded" />
            </div>
        )
    }

    return (
        <div className="rounded-xl border border-[#2a005016] shadow-xl p-5 bg-[#1fef3e1a] space-y-3">
            <h2 className="text-xl font-semibold">Зроблено Сервіс</h2>

            <p className="text-4xl font-bold">{servicesDone}</p>
            <p className="flex items-center text-sm text-[#21C45D]"> 
                <MoveUp size={15} strokeWidth={3} /> +{servicesDoneLast30Days} за останні 30 днів 
            </p>
        </div>
    )
}

export default ServiceDone