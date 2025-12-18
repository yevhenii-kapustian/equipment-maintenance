'use client'

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { EditTitle } from "@/actions/EquipmentPostsItem/edit-title"
import { useRouter } from "next/navigation"
import { X, ArrowDown } from "lucide-react"
import ErrorMessage from "@/components/ErrorMessage"
import { toast } from "sonner"
import { EquipmentListType } from "@/utils/supabase/queries"

const EditEquipmentTitle = ({ equipmentId, getEquipments }: { equipmentId: string, getEquipments: EquipmentListType }) => {
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [newTitle, setNewTitle] = useState("")
    const [newCategory, setNewCategory] = useState<string | undefined>("")

    const { mutate, error, isPending } = useMutation({
        mutationFn: EditTitle,
        onSuccess: (data) => {
            toast.success("Зміни успішно збережені")
            setIsOpen(false)
            setNewTitle("")
            router.replace(`/equipment/${data.slug}`)
        }
    })

    const uniqueCategories = Array.from(
        new Map(getEquipments.map(item => [item.category, item])).values()
    ).map(item => item.category)

    const getErrorMessage = () => {
        if (!error?.message) return ""
        try {
            const errors = JSON.parse(error.message)
            return errors[0]?.message || error.message
        } catch {
            return error.message
        }
    }

    return (
        <>
            <button
                className="py-2 px-4 gray-btn animation-btn cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                Редагувати
            </button>

            {isOpen && (
                <div onClick={() => setIsOpen(false)} className="fixed inset-0 flex justify-center items-center bg-[#0000002f] z-40">
                    <div onClick={(e) => e.stopPropagation()} className="w-120 p-5 flex flex-col gap-5 bg-white rounded-xl shadow-xl">
                        <div className="flex justify-between items-center">
                            <p className="text-xl font-bold">Редагувати</p>
                            <button onClick={() => setIsOpen(false)} className="cursor-pointer">
                                <X size={18} />
                            </button>
                        </div>
                        <div>
                            <input
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="w-full p-2 focus:outline-none border-b border-[#e0e0e0] rounded bg-white"
                                type="text"
                                placeholder="Напишіть назву"
                            />
                            {error && <ErrorMessage message={getErrorMessage()} />}
                        </div>

                        <div className="relative">
                            <select value={newCategory as string}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="w-full p-2 border rounded border-[#e0e0e0] capitalize appearance-none"
                            >
                                <option value="" disabled>
                                    Оберіть категорію
                                </option>

                                {uniqueCategories.map((category, index) => (
                                    <option key={index} value={category as string}>
                                        {category}
                                    </option>
                                ))}

                            </select>

                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"> <ArrowDown size={15} /> </span>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button onClick={() => setIsOpen(false)} className="py-2 px-4 animation-btn gray-btn cursor-pointer">
                                Скасувати
                            </button>
                            <button onClick={() => mutate({ equipmentId, name: newTitle, category: newCategory || undefined })}
                                    disabled={isPending}
                                    className="py-2 px-4 animation-btn black-btn cursor-pointer disabled:opacity-50"
                            >
                                {isPending ? "Збереження..." : "Зберегти"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditEquipmentTitle