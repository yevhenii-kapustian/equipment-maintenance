import { SupabaseClient } from "@supabase/supabase-js"

export async function isUserAdmin(supabase: SupabaseClient): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { data: profile } = await supabase.from("users")
        .select("role")
        .eq("id", user.id)
        .single()

    return profile?.role === "admin"
}

export async function isUserEmployee(supabase: SupabaseClient): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { data: profile } = await supabase.from("users")
        .select("role")
        .eq("id", user.id)
        .single()

    return profile?.role === "employee"
}