'use server'

import { createClient } from '@/utils/supabase/server-client'
import { revalidatePath } from 'next/cache'

type AddWorkLogsInput = {
    equipmentId: string
    description?: string
    files: File[]
}

export async function AddWorkLogsAction({ equipmentId, description, files }: AddWorkLogsInput) {
    const supabase = await createClient()

    if (!files.length) {
        throw new Error('Files are required')
    }

    const imageUrls: string[] = []

    for (const file of files) {
        const ext = file.name.split('.').pop()
        const fileName = `${crypto.randomUUID()}.${ext}`
        const filePath = `${equipmentId}/${fileName}`

        const { error: uploadError } = await supabase.storage.from('work-logs-images').upload(filePath, file)

        if (uploadError) {
            throw new Error(uploadError.message)
        }

        const { data } = supabase.storage.from('work-logs-images').getPublicUrl(filePath)

        imageUrls.push(data.publicUrl)
    }

    const {data: {user}} = await supabase.auth.getUser()

    const { data, error } = await supabase.from('work_logs')
                                        .insert({ 
                                            equipment_id: equipmentId,
                                            description,
                                            image_urls: imageUrls,
                                            user_id: user?.id
                                        })
                                        .select()
                                        .single()

    if (error) throw new Error(error.message)

    revalidatePath(`/equipment/${equipmentId}`)

    return data
}
