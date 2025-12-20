'use client'

import { useMutation } from "@tanstack/react-query"
import { AddDetails } from "@/actions/EquipmentPostsItem/add-details"
import { useState } from "react"
import ErrorMessage from "@/components/ErrorMessage"
import { toast } from "sonner"
import { addEquipmentDetailsSchema } from "@/actions/schemas"
import { useQueryClient } from "@tanstack/react-query"
import { X } from "lucide-react"
import { equipmentDetailsLevels } from "@/data/equipmentDetailsLevels"

type CreateEquipmentDetailsProps = {
    equipmentId: string,
    slug: string,
    setIsOpenCreate: (value: boolean) => void
}

type FormErrors = {
  schedule?: string
  plan?: string
  fact?: string,
}

const CreateEquipmentDetails = ({equipmentId, slug, setIsOpenCreate}: CreateEquipmentDetailsProps) => {
    const [schedule, setSchedule] = useState<string>("")
    const [plan, setPlan] = useState<string>("")
    const [fact, setFact] = useState<string>("")
    const [formErrors, setFormErrors] = useState<FormErrors>({})

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: AddDetails,
        onSuccess: (newDetails) => {
            toast.success("Інформація успішно збережена")
            queryClient.setQueryData(
                ["equipmentDetail", equipmentId],
                newDetails
            )

            setSchedule("")
            setPlan("")
            setFact("")
        }
    })

    const handleSave = () => {
        const result = addEquipmentDetailsSchema.safeParse({
            equipmentId,
            schedule,
            plan,
            fact: fact || undefined,
            slug
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
        <div onClick={() => setIsOpenCreate(false)} className="w-full h-full absolute top-0 left-0 flex justify-center items-center bg-[#0000002f]">
            <div onClick={(e) => e.stopPropagation()} className="w-120 p-5 border border-[#e0e0e0] bg-white rounded-2xl shadow-xl">
                <div className="flex justify-between">
                    <p className="text-xl font-bold">Планування</p>
                    <button onClick={() => setIsOpenCreate(false)} className="cursor-pointer"> <X size={18} /> </button>
                </div>
                <div className="mt-7 pt-7 flex items-center border-t border-[#e0e0e0]">
                    <p className="px-2">Дата обслуговування:</p>
                    <input className="underline cursor-pointer" value={schedule} onChange={(e) => setSchedule(e.target.value)} type="date" />
                </div>
                {formErrors.schedule && (
                    <ErrorMessage message={formErrors.schedule} />
                )}

                <div className="mt-7 flex flex-col gap-7">
                    <input value={plan}
                        onChange={(e) => setPlan(e.target.value)}
                        className="w-full p-2 focus:outline-none border-b border-[#e0e0e0] rounded bg-white"
                        type="text"
                        placeholder="План"
                    />
                    {formErrors.plan && (
                        <ErrorMessage message={formErrors.plan} />
                    )}

                    <select value={fact} onChange={(e) => setFact(e.target.value)} className="w-full p-2 focus:outline-none border-b border-[#e0e0e0] rounded bg-white">
                        <option value="" disabled>Select an option</option>
                        {equipmentDetailsLevels.map((item, index) => (
                            <option key={index} value={item.level}>{item.level}</option>
                        ))}
                    </select>
                    {formErrors.fact && (
                        <ErrorMessage message={formErrors.fact} />
                    )}
                </div>
                <button onClick={handleSave} className="mt-7 p-2 w-full animation-btn black-btn cursor-pointer">Зберегти</button>
            </div>
        </div>
    )
}

export default CreateEquipmentDetails