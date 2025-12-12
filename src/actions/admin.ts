'use server'

import { createClient } from "@/utils/supabase/server-client"

type EditRoleProps = {
    userId: string,
    role: string | null
}

export async function EditRole({userId, role}: EditRoleProps) {
    const supabase = await createClient()

    const { data, error } = await supabase.from("users")
                                        .update({role})
                                        .eq("id", userId)
                                        .select()
    if (error) throw error

    return data
}