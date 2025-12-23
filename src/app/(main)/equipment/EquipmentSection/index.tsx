'use client'

import { EquipmentListType } from "@/utils/supabase/queries";
import Equipments from "./Equipments";
import Pagination from "@/components/Pagination";
import { useState } from "react";
import EquipmentFilter from "./EquipmentFilter";
import Link from "next/link";

type EquipmentSectionProps = {
    equipment: EquipmentListType,
    isAdmin: boolean
}

const EquipmentSection = ({ equipment, isAdmin }: EquipmentSectionProps) => {
    const POSTS_PER_PAGE = 5

    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    const filteredEquipments = selectedCategory 
        ? equipment.filter((item) => item.category === selectedCategory)
        : equipment

    const totalPages = Math.ceil(filteredEquipments.length / POSTS_PER_PAGE)
    const displayPage = currentPage > totalPages ? 1 : currentPage
    
    const startIndex = (displayPage - 1) * POSTS_PER_PAGE
    const currentPosts = filteredEquipments.slice(startIndex, startIndex + POSTS_PER_PAGE)

    const handleCategoryChange = (category: string | null) => {
        setSelectedCategory(category)
        setCurrentPage(1)
    }

    return (
        <section>
            <div className="flex justify-between items-center gap-5 max-sm:flex-col max-sm:items-start">
                <h1 className="text-5xl font-semibold max-sm:text-4xl">Обладнання</h1>
                <div className="flex items-center gap-5">
                    {isAdmin && <Link href="/equipment/create" className="py-2 px-4 gray-btn animation-bt font-semibold">Створити нове</Link> }
                    <EquipmentFilter 
                        categories={equipment}
                        onCategorySelect={handleCategoryChange}
                        selectedCategory={selectedCategory}
                    />
                </div>
            </div>

            <div className="mt-10 pt-10 border-t border-[#e0e0e0]">
              <div className="max-sm:overflow-x-auto">
                <div className="min-w-[600px]">

                  <div className="px-20 grid grid-cols-3 justify-items-center gap-5 items-center text-center max-sm:px-5">
                    <p>Найменування обладнання</p>
                    <p>Тип</p>
                    <p>Область</p>
                  </div>

                  <div className="mt-10 relative">
                    {currentPosts.length > 0 ? (
                      <Equipments isAdmin={isAdmin} equipments={currentPosts} />
                    ) : (
                      <p className="mt-10 text-center text-gray-500">
                        {filteredEquipments.length === 0
                          ? "Обладнання в цій категорії не знайдено"
                          : "Обладнання не знайдено"}
                      </p>
                    )}
                  </div>
                  
                </div>
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={displayPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
          </div>

        </section>
    )
}

export default EquipmentSection