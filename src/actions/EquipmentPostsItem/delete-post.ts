'use server'

import { createClient } from "@/utils/supabase/server-client"
import { revalidatePath } from "next/cache"

export const DeletePost = async (postId: string) => {
    const supabase = await createClient()
    await supabase.from("equipment").delete().eq("id", postId).throwOnError()

    revalidatePath("/equipment")
}