import { createClient } from "@/utils/supabase/server-client"
import EquipmentChanges from "./EquipmentChanges"
import { getEquipmentList } from "@/utils/supabase/queries"

const ServicePage = async () => {
    const supabase = await createClient()
    const {data: equipmentList} = await getEquipmentList(supabase)

    return(
        <section>
            <h1 className="text-5xl font-semibold">Обслуговування</h1>
            <EquipmentChanges equipmentsAmount={equipmentList?.length ?? 0} />
        </section>
    )
}

export default ServicePage