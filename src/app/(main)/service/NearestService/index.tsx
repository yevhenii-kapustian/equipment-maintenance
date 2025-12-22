'use client'

import { Clock4 } from "lucide-react"
import { createClient } from "@/utils/supabase/browser-client"
import { useEffect, useState } from "react"
import { getEquipmentWithDetails, GetEquipmentWithDetailsType } from "@/utils/supabase/queries"
import Link from "next/link"

const NearestService = () => {
    const [equipment, setEquipment] = useState<GetEquipmentWithDetailsType>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetch = async () => {
            const supabase = createClient()
            const { data } = await getEquipmentWithDetails(supabase)

            setEquipment(data ?? [])
            setLoading(false)
        }

        fetch()
    }, [])

    const getNextSchedule = (item: any) => {
        const detail = item.equipment_details.find((d: any) => d.fact !== "виконано" && d.schedule)
        return detail ? new Date(detail.schedule).getTime() : Infinity
    }

    const sortedEquipment = [...equipment].sort((a, b) => getNextSchedule(a) - getNextSchedule(b))

    if (loading) {
        return(
            <div className="mt-10 w-[30%] min-h-full py-5 px-8 border border-[#00000030] shadow-lg rounded-2xl animate-pulse">
            <h4 className="h-6 w-48 bg-gray-300 rounded mb-4"></h4>
            <div className="mt-5 h-80 flex flex-col gap-5 overflow-y-scroll">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="pt-5 border-t border-[#e0e0e0]">
                        <div className="flex justify-between items-center">
                            <div className="h-4 w-32 bg-gray-300 rounded"></div>
                            <div className="h-4 w-20 bg-gray-300 rounded"></div>
                        </div>
                        <div className="mt-2 h-4 w-48 bg-gray-300 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
        )
    }

    return (
        <div className="mt-10 w-[30%] min-h-full py-5 px-8 border border-[#00000030] shadow-lg rounded-2xl">
            <h4 className="flex items-center gap-2 text-xl font-semibold mb-4">
                <Clock4 size={15} strokeWidth={3} /> Найближче Обслуговування
            </h4>

            <div className="mt-5 h-80 flex-1 overflow-y-scroll flex flex-col gap-5">
                {sortedEquipment.map((item, index) => {
                    const detail = item.equipment_details.filter(d => d.fact !== "виконано" && d.schedule)
                                                        .sort((a, b) => new Date(a.schedule!).getTime() - new Date(b.schedule!).getTime())[0]

                    if (!detail) return null
                    const days = (new Date(detail.schedule!).getTime() - Date.now()) / (1000 * 60 * 60 * 24)

                    let priority = "Низький"
                    let color = "bg-[#F0F2F4] text-[#67717E]"

                    if (days <= 6) {
                        priority = "Високий"
                        color = "bg-red-600 text-white"
                    } else if (days <= 12) {
                        priority = "Середній"
                        color = "bg-yellow-600 text-white"
                    }

                    return (
                        <div key={index} className="pt-5 border-t border-[#e0e0e0]">
                            <Link key={item.id} href={`/equipment/${item.slug}`}>
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">{item.name}</p>
                                    <p className={`w-25 py-1 text-xs text-center font-semibold rounded-2xl ${color}`}> {priority} </p>
                                </div>
                                <div className="text-sm">
                                    <p className="text-gray-600">Планова перевірка</p>
                                    <p>{detail.schedule}</p>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NearestService