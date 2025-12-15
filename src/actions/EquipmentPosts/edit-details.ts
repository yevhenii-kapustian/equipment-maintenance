'use server'

import { createClient } from "@/utils/supabase/server-client"
import { editEquipmentDetailsSchema } from "../schemas"

export async function EditDetails(input: unknown) {
    const { equipmentId, schedule, plan, fact } = editEquipmentDetailsSchema.parse(input)

    const supabase = await createClient()

    const { data: editEquipmentDetails, error } = await supabase
        .from("equipment_details")
        .update({
            schedule,
            plan,
            fact,
        })
        .eq("equipment_id", equipmentId)
        .select()
        .single()

    if (error) throw error

    return editEquipmentDetails
}
