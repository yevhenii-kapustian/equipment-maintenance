import { useQuery } from "@tanstack/react-query"
import { getSingleEquipmentDetailsType } from "@/utils/supabase/queries"
import { createClient } from "@/utils/supabase/browser-client"

export const useSingleEquipmentDetail = (equipmentId: string) => {
    return useQuery<getSingleEquipmentDetailsType>({
        queryKey: ["equipmentDetail", equipmentId],
        queryFn: async () => {
            const supabase = createClient()

            const { data: getSingleEquipmentDetails, error } = await supabase
                                                        .from("equipment_details")
                                                        .select("*")
                                                        .eq("equipment_id", equipmentId)
            
            if (error) throw new Error(error.message)
            return getSingleEquipmentDetails?.[0] || null
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        meta: {
            keepPreviousData: true
        }
    })
}