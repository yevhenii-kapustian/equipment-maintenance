'use server'

import { createClient } from "@/utils/supabase/server-client"
import { addEquipmentDetailsSchema } from "../schemas"
import z from "zod"
import { revalidatePath } from "next/cache"

export async function AddDetails(details: z.infer<typeof addEquipmentDetailsSchema>) {
    const { schedule, plan, fact, equipmentId, slug } = addEquipmentDetailsSchema.parse(details)
    
    const supabase = await createClient()

    const { data: equipmentDetails, error } = await supabase.from("equipment_details")
                                                            .insert({
                                                                equipment_id: equipmentId,
                                                                schedule: schedule,
                                                                plan: plan,
                                                                fact: fact,
                                                            })
                                                            .select()
                                                            .single()

    if (error) throw new Error(error.message)

    revalidatePath(`/equipment/${slug}`)

    return equipmentDetails
}