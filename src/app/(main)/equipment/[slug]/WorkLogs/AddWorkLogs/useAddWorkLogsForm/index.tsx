'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { AddWorkLogsAction } from '@/actions/EquipmentPostsItem/add-workLogs'
import { addWorkLogsSchema } from '@/actions/schemas'

export type FormErrors = {
    files?: string
    description?: string
}

export const useAddWorkLogsForm = (equipmentId: string) => {
    const queryClient = useQueryClient()
    
    const [files, setFiles] = useState<File[]>([])
    const [description, setDescription] = useState('')
    const [formErrors, setFormErrors] = useState<FormErrors>({})

    const { mutate, isPending } = useMutation({
        mutationFn: AddWorkLogsAction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['work-logs', equipmentId] })
            toast.success('Зміни успішно збережені')
            setFiles([])
            setDescription('')
        },
        onError: (error: Error) => {
            toast.error(error.message)
        },
    })

    const handleSave = () => {
        const result = addWorkLogsSchema.safeParse({ files, description })
        if (!result.success) {
            const errors: FormErrors = {}
            result.error.issues.forEach(err => {
                const field = err.path[0] as keyof FormErrors
                errors[field] = err.message
            })
            setFormErrors(errors)
            return
        }
        
        setFormErrors({})
        mutate({ equipmentId, ...result.data })
    }

    return {
        files, setFiles, description, setDescription, formErrors, isPending,
        removeFile: (index: number) => setFiles(prev => prev.filter((_, i) => i !== index)),
        handleSave,
    }
}
