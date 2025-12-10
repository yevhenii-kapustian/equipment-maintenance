import { createClient } from "./browser-client";
import { type QueryData } from "@supabase/supabase-js";

export const getEquipmentList = async (supabase: ReturnType<typeof createClient>) => {
    return await supabase.from("equipment")
                        .select('*')
                        .order('created_at', {ascending: false});
}

export type EquipmentListType = QueryData<ReturnType<typeof getEquipmentList>>