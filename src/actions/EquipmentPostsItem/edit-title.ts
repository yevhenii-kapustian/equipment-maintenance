'use server'

import { createClient } from "@/utils/supabase/server-client"
import { buildSlug } from "@/utils/slug"
import { editEquipmentTitleSchema } from "../schemas"

export async function EditTitle (input: unknown) {
    const { name, equipmentId, category } = editEquipmentTitleSchema.parse(input)

    const supabase = await createClient()

    const slug = name 
        ? buildSlug(name, equipmentId)
        : null

    const { data, error } = await supabase.from("equipment")
                                    .update({name, slug, category})
                                    .eq("id", equipmentId)
                                    .select()
                                    .single()
    
    if (error) throw error

    return data
}