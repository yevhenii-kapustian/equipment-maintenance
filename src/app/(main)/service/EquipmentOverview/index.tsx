'use client'

import { createClient } from "@/utils/supabase/browser-client"
import { useEffect, useState } from "react"
import { getEquipmentWithDetails, GetEquipmentWithDetailsType } from "@/utils/supabase/queries"
import { equipmentDetailsLevels } from "@/data/equipmentDetailsLevels"
import Link from "next/link"
import { MapPin, CalendarDays, User } from "lucide-react"

const EquipmentOverview = () => {
    const [equipment, setEquipment] = useState<GetEquipmentWithDetailsType>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchEquipmentOverview = async () => {
            const supabase = await createClient()
            const { data } = await getEquipmentWithDetails(supabase)
            const filteredEquipment = (data ?? []).filter(equipment => equipment.equipment_details?.some(detail => Boolean(detail.fact)))
            

            setEquipment(filteredEquipment)
            setLoading(false)
        }

        fetchEquipmentOverview()
    }, [])

    if (loading) {
        return (
            <div className="mt-10 w-[70%] max-xl:w-full max-sm:mt-15 animate-pulse">
                <div className="flex justify-between items-center gap-3">
                    <div className="h-7 w-56 bg-gray-300 rounded"></div>
                    <div className="h-10 w-32 bg-gray-300 rounded-xl max-sm:w-1/2"></div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="border border-[#00000030] shadow-lg rounded-2xl">
                            <div className="py-5 px-8 flex justify-between gap-3">
                                <div className="flex flex-col gap-3 w-full">
                                    <div className="h-6 w-2/3 bg-gray-300 rounded"></div>
                                    <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                                    <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                                    <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
                                </div>

                                <div className="min-w-25 h-6 bg-gray-300 rounded-2xl"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return(
        <div className="mt-10 w-[70%] max-xl:w-full max-sm:mt-15">
            <div className="flex justify-between items-center gap-3">
                <h4 className="text-2xl font-semibold">Огляд обладнання</h4>
                <Link className="py-2 px-4 text-sm text-center font-semibold gray-btn animation-btn max-sm:w-1/2" href="/service/overview">Дивитись Усі</Link>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                {equipment.slice(0, 4).map((item, index) => {
                    const sortedDetails = [...item.equipment_details].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

                    const lastFact = sortedDetails[0]?.fact
                    const levelConfig = equipmentDetailsLevels.find(l => l.level === lastFact)

                    return(
                        <div key={index} className="border border-[#00000030] shadow-lg rounded-2xl">
                            <Link className="py-5 px-8 flex justify-between gap-3" href={`/equipment/${item.slug as string}`}>
                                <div className="flex flex-col gap-2">
                                    <p className="text-xl font-semibold">{item.name}</p>
                                    <p className="flex items-center gap-2 capitalize"> < MapPin size={15} strokeWidth={2} /> {item.location}</p>
                                    <p className="flex items-center gap-2"> <CalendarDays size={15} strokeWidth={2} /> Наступне: {item.equipment_details.map(item => item.schedule)}</p>
                                    <p className="flex items-center gap-2 capitalize"> <User size={15} strokeWidth={2} /> {item.users.username}</p>
                                </div>
                                <p style={{ backgroundColor: levelConfig?.styleBg }}
                                    className="min-w-25 h-fit py-1 text-white text-center text-xs font-semibold rounded-2xl capitalize"    
                                >
                                    {sortedDetails.map(details => details.fact)}
                                </p>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default EquipmentOverview