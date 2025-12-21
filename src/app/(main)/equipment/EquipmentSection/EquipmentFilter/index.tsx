import { ArrowDown, X } from "lucide-react"
import { useState } from "react"
import { EquipmentListType } from "@/utils/supabase/queries"

type EquipmentFilterProps = {
    categories: EquipmentListType
    onCategorySelect: (category: string | null) => void
    selectedCategory: string | null
}

const EquipmentFilter = ({ categories, onCategorySelect, selectedCategory }: EquipmentFilterProps) => { 
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleCategoryClick = (category: string) => {
        onCategorySelect(category)
        setIsOpen(false)
    }

    const handleClearFilter = () => {
        onCategorySelect(null)
        setIsOpen(false)
    }

    const uniqueCategories = Array.from(
        new Map(categories.map(item => [item.category, item])).values()
    ).map(item => item.category)

    return (
        <div className="relative z-15">
            <button 
                className="p-2 px-4 w-fit text-center font-semibold 
                            dirty-white-btn animation-btn cursor-pointer
                            flex justify-center items-center gap-2
                            rounded-lg capitalize"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedCategory || "Всі"}
                <ArrowDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="mt-2 absolute top-full right-0 max-sm:left-0 w-48 bg-white border border-[#e0e0e0] rounded-lg shadow-lg z-10 overflow-hidden">
                    <button
                        onClick={handleClearFilter}
                        className={`w-full text-left px-4 py-3 transition-colors border-b border-[#e0e0e0] bg-[#f7ffe9] cursor-pointer`}
                    >
                        Всі категорії
                    </button>

                    {uniqueCategories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryClick(category as string)}
                            className={`w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors capitalize cursor-pointer
                                       ${selectedCategory === category ? 'bg-gray-100' : ''}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default EquipmentFilter