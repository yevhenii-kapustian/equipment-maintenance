'use client'

import { EquipmentListType } from "@/utils/supabase/queries";
import Equipments from "./Equipments";
import Pagination from "@/components/Pagination";
import { useState } from "react";

const EquipmentSection = ({equipment}: {equipment: EquipmentListType}) => {
    const POSTS_PER_PAGE = 5

    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(equipment.length / POSTS_PER_PAGE)
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    const currentPosts = equipment.slice(startIndex, startIndex + POSTS_PER_PAGE)

    return(
        <section>
            <div className="flex justify-between items-center gap-5 max-sm:flex-col max-sm:items-start">
                <h1 className="text-5xl font-semibold">Обладнання</h1>
                <p className="p-2 w-30 text-center font-semibold dirty-white-btn animation-btn">Всі</p>
            </div>
            <div className="mt-10 pt-10 border-t border-[#e0e0e0]">
                <div className="px-20 grid grid-cols-3 justify-items-center gap-5 items-center text-center max-sm:px-5">
                    <p>Найменування обладнання</p>
                    <p>Тип</p>
                    <p>Область</p>
                </div>

                <div className="mt-10">
                    {currentPosts.length > 0 ? <Equipments equipments={currentPosts}/> : <p className="mt-10">No equipment found</p>}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
        </section>
    )
}

export default EquipmentSection;