'use client'

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/browser-client"

const EquipmentActive = () => {
    const supabase = createClient()

    const [count, setCount] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFacts = async () => {
            const { data } = await supabase.from('equipment_details').select('fact')

            const active = data?.filter(item => item.fact === "у процесі").length ?? 0

            setCount(active)
            setLoading(false)
        }

        fetchFacts()
    }, [])

    if (loading) {
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
                Активне технічне обслуговування
            </h2>

            <p className="text-4xl font-bold">{count}</p>
        </div>
    )
}

export default EquipmentActive