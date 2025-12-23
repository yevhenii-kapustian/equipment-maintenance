'use client'

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { addNewEquipmentSchema } from "@/actions/schemas"
import { addNewEquipmentAction } from "@/actions/EquipmentPostsItem/add-new-equipment"
import { buildSlug } from "@/utils/slug"
import ErrorMessage from "@/components/ErrorMessage"
import Logo from "@/components/Logo"

type FormErrors = {
    name?: string,
    location?: string,
    category?: string
}

const CreateEquipmentForm = ({ userId }: {userId: string}) => {
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [category, setCategory] = useState("")
    const [errors, setErrors] = useState<FormErrors>({})

    const slug = buildSlug(name, userId)

    const { mutate, isPending } = useMutation({
        mutationFn: addNewEquipmentAction,
        onSuccess: () => {
            setName("")
            setLocation("")
            setCategory("")
        },
    })

    const handleSubmit = () => {
        const result = addNewEquipmentSchema.safeParse({
                                                        name,
                                                        location,
                                                        category,
                                                        slug,
                                                        userId,
        })

        if (!result.success) {
            const fieldErrors: FormErrors = {}
            result.error.issues.forEach(err => {
                fieldErrors[err.path[0] as keyof FormErrors] = err.message
            })
            setErrors(fieldErrors)
            return
        }

        setErrors({})
        mutate(result.data)
    }

    return (
        <div className="w-full flex items-center gap-5 max-sm:flex-col">
            <div className="w-full max-w-1/2 max-sm:max-w-full">
                <h1 className="mb-6 text-5xl font-semibold">Створення нового обладнання</h1>
                <p>На цій сторінці ви можете додати нове обладнання до системи, вказавши основну інформацію, місцезнаходження та категорію для подальшого обслуговування й контролю.</p>
            </div>

            <div className="w-full max-w-1/2 mt-10 p-5 flex flex-col border border-[#e0e0e0] rounded-xl max-sm:max-w-full max-sm:mt-5">
                <Logo fontSize={35}/>
                <div className="mt-5">
                    <label htmlFor="name">Назва</label>
                    <input id="name" value={name} 
                            onChange={e => setName(e.target.value)} 
                            placeholder="Введіть назву обладнання" 
                            className="w-full p-2 focus:outline-none border-b border-[#e0e0e0] rounded bg-white" 
                    />
                    {errors.name && <ErrorMessage message={errors.name} />}
                </div>

                <div className="mt-5">
                    <label htmlFor="location">Область</label>
                    <input id="location" value={location} 
                            onChange={e => setLocation(e.target.value)} 
                            placeholder="Введіть місце розташування обладнання" 
                            className="w-full p-2 focus:outline-none border-b border-[#e0e0e0] rounded bg-white" 
                    />
                    {errors.location && <ErrorMessage message={errors.location} />}
                </div>

                <div className="mt-5">
                    <label htmlFor="category">Категорія</label>
                    <input id="category" value={category} 
                            onChange={e => setCategory(e.target.value)} 
                            placeholder="Виберіть категорію обладнання" 
                            className="w-full p-2 focus:outline-none border-b border-[#e0e0e0] rounded bg-white" 
                    />
                    {errors.category && <ErrorMessage message={errors.category} />}
                </div>

                <button onClick={handleSubmit} disabled={isPending} className="black-btn animation-btn mt-5 py-3 px-4 disabled:opacity-50 cursor-pointer">
                    {isPending ? "Збереження..." : "Зберегти"}
                </button>
            </div>

        </div>
    )
}

export default CreateEquipmentForm