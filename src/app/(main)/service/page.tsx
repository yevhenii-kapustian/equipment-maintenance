import { createClient } from "@/utils/supabase/server-client"
import EquipmentChanges from "./EquipmentChanges"
import EquipmentActive from "./EquipmentActive"
import { getEquipmentList, getSingleEquipment } from "@/utils/supabase/queries"

const ServicePage = async () => {
    const supabase = await createClient()
    const { data: equipmentList } = await getEquipmentList(supabase)
    const equipmentSlug = equipmentList?.find(item => item.slug)?.slug ?? ""
    const { data: singleEquipment } = await getSingleEquipment(equipmentSlug)

    return(
        <section>
            <h1 className="text-5xl font-semibold">Обслуговування</h1>
            <div className="grid grid-cols-4 gap-5">
                <EquipmentChanges equipmentsAmount={equipmentList?.length ?? 0} />
                <EquipmentActive />
            </div>

        </section>
    )
}

export default ServicePage