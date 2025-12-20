'use server'

import { createClient } from "@/utils/supabase/server-client"

export async function getAddedEquipmentLast30Days() {
    const supabase = await createClient()

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { count, error } = await supabase
        .from("equipment")
        .select("*", { count: "exact", head: true })
        .gte("created_at", thirtyDaysAgo.toISOString())

    if (error) {
        throw new Error(error.message)
    }

    return count ?? 0
}