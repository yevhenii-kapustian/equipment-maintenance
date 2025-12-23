'use client'

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/browser-client"
import { getEquipmentWithDetails, GetEquipmentWithDetailsType } from "@/utils/supabase/queries"
import { equipmentDetailsLevels } from "@/data/equipmentDetailsLevels"
import Link from "next/link"
import { CalendarDays, MapPin, User } from "lucide-react"

const OverviewEquipment = () => {
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

    return (
         <div className="w-full">
            <div className="flex justify-between items-center gap-3">
                <h4 className="text-4xl font-semibold">Огляд обладнання</h4>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                {equipment.map((item, index) => {
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

export default OverviewEquipment