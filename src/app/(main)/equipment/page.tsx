import { getEquipmentList } from "@/utils/supabase/queries";
import EquipmentSection from "@/app/(main)/equipment/EquipmentSection";
import { createClient } from "@/utils/supabase/server-client";

const EquipmentPage = async () => {
    const supabase = await createClient()
    const {data: equipment} = await getEquipmentList(supabase)

    return(
        <>
        <EquipmentSection equipment={equipment ?? []} /> 
        </>
    )
}

export default EquipmentPage; 