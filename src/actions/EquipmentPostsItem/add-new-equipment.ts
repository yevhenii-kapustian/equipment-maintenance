'use server'

import { createClient } from "@/utils/supabase/server-client"
import { addNewEquipmentSchema, AddNewEquipmentInput } from "../schemas"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function addNewEquipmentAction( payload: AddNewEquipmentInput ) {
    const data = addNewEquipmentSchema.parse(payload)

    const supabase = await createClient()

    const { error } = await supabase
                                    .from("equipment")
                                    .insert({
                                        name: data.name,
                                        location: data.location,
                                        category: data.category,
                                        slug: data.slug,
                                        user_id: data.userId,
                                    })

    if (error) {
        throw new Error(error.message)
    }
  
    revalidatePath("/equipment")
    redirect(`/equipment/${data.slug}`)
}
