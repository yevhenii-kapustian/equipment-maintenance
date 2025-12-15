import { X } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { EditDetails } from "@/actions/EquipmentPosts/edit-details"
import { toast } from "sonner"
import ErrorMessage from "@/components/ErrorMessage"
import { useEffect, useState } from "react"
import { editEquipmentDetailsSchema } from "@/actions/schemas"
import { useSingleEquipmentDetail } from "@/hooks/EquipmentDetails/useSingleEquipmentDetail"

type EditEquipmentDetailsProps = {
    setIsOpenEdit: (value: boolean) => void,
    equipmentId: string
}

type FormErrors = {
  schedule?: string
  plan?: string
  fact?: string
}

const EditEquipmentDetails = ({setIsOpenEdit, equipmentId}: EditEquipmentDetailsProps) => {
    const queryClient = useQueryClient()
    const { data } = useSingleEquipmentDetail(equipmentId)

    const [editedSchedule, setEditedSchedule] = useState<string>("")
    const [editedPlan, setEditedPlan] = useState<string>("")
    const [editedFact, setEditedFact] = useState<string>("")
    const [formErrors, setFormErrors] = useState<FormErrors>({})

    const { mutate } = useMutation({
    mutationFn: EditDetails,
    onSuccess: (updatedDetails) => {
            toast.success("Інформація оновлена")
            queryClient.setQueryData(
                ["equipmentDetail", equipmentId],
                updatedDetails
            )
            setIsOpenEdit(false)
        }
    })

    useEffect(() => {
        if (!data) return

        setEditedSchedule(data.schedule ?? "")
        setEditedPlan(data.plan ?? "")
        setEditedFact(data.fact ?? "")
    }, [data])

     const handleSave = () => {
            const result = editEquipmentDetailsSchema.safeParse({
                equipmentId,
                schedule: editedSchedule,
                plan: editedPlan,
                fact: editedFact || undefined,
            })
    
            if (!result.success) {
                const fieldErrors: FormErrors = {}
    
                result.error.issues.forEach(err => {
                    const field = err.path[0] as keyof FormErrors
                    fieldErrors[field] = err.message
                })
    
                setFormErrors(fieldErrors)
                return
            }
    
            setFormErrors({})
            mutate(result.data)
        }

    return (
        <div onClick={() => setIsOpenEdit(false)} className="w-full h-full absolute top-0 left-0 flex justify-center items-center bg-[#0000002f]">
            <div onClick={(e) => e.stopPropagation()} className="w-120 p-5 border border-[#e0e0e0] bg-white rounded-2xl shadow-xl">
                <div className="flex justify-between">
                    <p className="text-xl font-bold">Планування</p>
                    <button onClick={() => setIsOpenEdit(false)} className="cursor-pointer"> <X size={18} /> </button>
                </div>
                <div className="mt-7 pt-7 flex items-center gap-2 border-t border-[#e0e0e0]">
                    <p>Дата обслуговування:</p>
                    <input value={editedSchedule} onChange={(e) => setEditedSchedule(e.target.value)} type="date" />
                </div>
                {formErrors.schedule && (
                    <ErrorMessage message={formErrors.schedule} />
                )}

                <div className="mt-7 flex flex-col gap-7">
                    <input value={editedPlan}
                        onChange={(e) => setEditedPlan(e.target.value)}
                        className="w-full p-2 focus:outline-none border-b border-[#e0e0e0] rounded bg-white"
                        type="text"
                        placeholder="План"
                    />
                    {formErrors.plan && (
                        <ErrorMessage message={formErrors.plan} />
                    )}

                    <input value={editedFact}
                        onChange={(e) => setEditedFact(e.target.value)}
                        className="w-full p-2 focus:outline-none border-b border-[#e0e0e0] rounded bg-white"
                        type="text"
                        placeholder="Факт"
                    />
                    {formErrors.fact && (
                        <ErrorMessage message={formErrors.fact} />
                    )}
                </div>
                <button onClick={handleSave} className="mt-7 p-2 w-full animation-btn gray-btn cursor-pointer">Зберегти</button>
            </div>
        </div>
    )
}

export default EditEquipmentDetails