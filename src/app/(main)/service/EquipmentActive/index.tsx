'use client'

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/browser-client"

const EquipmentActive = () => {
    const supabase = createClient()

    const [facts, setFacts] = useState<string[]>([])
    const filteredFacts = facts.filter(item => item === "у процесі")
    console.log(filteredFacts);
    

    useEffect(() => {
        const fetchFacts = async () => {
            const { data } = await supabase.from('equipment_details').select('fact')

            const factList = data?.map(item => item.fact)
            setFacts(factList as string[])
        }

        fetchFacts()
    }, [])

    return (
        <div className="mt-10 rounded-xl border border-[#2a005016] shadow-xl p-5 bg-[#F8F8F8] space-y-3">
            <h2 className="text-xl font-semibold">
                Активне технічне обслуговування
            </h2>

            <p className="text-4xl font-bold">{filteredFacts.length}</p>
        </div>
    )
}

export default EquipmentActive