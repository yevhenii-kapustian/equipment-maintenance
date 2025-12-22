import { createClient } from "./browser-client";
import { type QueryData } from "@supabase/supabase-js";

export const getEquipmentList = async (supabase: ReturnType<typeof createClient>) => {
    return await supabase.from("equipment")
                        .select('*')
                        .order('created_at', {ascending: false});
}

export const getSingleEquipment = async (slug: string) => {
    const supabase = createClient()
    return await supabase.from("equipment")
                            .select("*")
                            .eq("slug", slug)
                            .single()
}

export const getSingleEquipmentDetails = async ( equipmentId: string ) => {
    const supabase = createClient()
    return await supabase.from("equipment_details")
                            .select("*")
                            .eq("equipment_id", equipmentId)
                            .single()
}

export const getEquipmentWithDetails = async (supabase: ReturnType<typeof createClient>) => {
  return await supabase
    .from("equipment")
    .select(`
      id,
      name,
      slug,
      user_id,
      location,
      users (
        id,
        username,
        email
      ),
      equipment_details (
        id,
        schedule,
        fact,
        created_at
      )
    `)
}

export const getUserRole = async (id: string) => {
    const supabase = createClient()
    return await supabase.from("users")
                            .select("role")
                            .eq("id", id)
                            .single()
}

export const getUsers = async () => {
    const supabase = createClient()
    return await supabase.from("users")
                        .select("*")
                        .order("created_at", { ascending: false })
}

export const getWorkLogs = async (equipmentId: string) => {
    const supabase = createClient()
    return await supabase.from("work_logs")
                        .select(`
                            id,
                            description,
                            image_urls,
                            created_at,
                            user_id,
                            users (
                                id,
                                username
                            )
                        `)
                        .eq("equipment_id", equipmentId)

}

export type EquipmentListType = QueryData<ReturnType<typeof getEquipmentList>>
export type getUsersType = QueryData<ReturnType<typeof getUsers>>
export type getSingleEquipmentDetailsType = QueryData<ReturnType<typeof getSingleEquipmentDetails>>
export type GetWorkLogsType = QueryData<ReturnType<typeof getWorkLogs>>
export type GetEquipmentWithDetailsType = QueryData<ReturnType<typeof getEquipmentWithDetails>>