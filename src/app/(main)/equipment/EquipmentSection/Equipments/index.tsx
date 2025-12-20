 'use client'

import { EquipmentListType } from "@/utils/supabase/queries";
import { X } from "lucide-react"
import Link from "next/link";
import { DeletePost } from "@/actions/EquipmentPostsItem/delete-post";
import { startTransition } from "react";

const Equipments = ({equipments, isAdmin}: {equipments: EquipmentListType, isAdmin: boolean}) => {
    const handleRemove = (id: string) => {
        startTransition(() => {
            DeletePost(id)
        })
    }

    return (
        <>
        {equipments.map((equipment, index) => (
            <div key={index} className="relative">
                {isAdmin && (
                    <button className="absolute bottom-10 right-0 p-1 bg-white rounded-2xl cursor-pointer z-10"
                            onClick={() => handleRemove(equipment.id)}
                    >
                        <X /> 
                    </button>
                )}
                
                <Link href={`/equipment/${equipment.slug}`} className="grid grid-cols-3 justify-items-center text-center items-center gap-5 mt-5 py-4 px-20 bg-[#00000011] rounded-3xl capitalize max-sm:px-5">
                    <p>{equipment.name}</p>
                    <p>{equipment.category}</p>
                    <p>{equipment.location}</p>
                </Link>
            </div>
        ))}
        </>
    )
}

export default Equipments