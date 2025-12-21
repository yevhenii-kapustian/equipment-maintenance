import { createClient } from "@/utils/supabase/server-client"
import { getEquipmentWithDetails } from "@/utils/supabase/queries"
import EquipmentChanges from "./EquipmentChanges"
import EquipmentActive from "./EquipmentActive"
import ExpiredEquipment from "./ExpiredEquipment"

const ServicePage = async () => {
    const supabase = await createClient()
    const { data } = await getEquipmentWithDetails(supabase)

    return (
        <section>
            <h1 className="text-5xl font-semibold">Обслуговування</h1>

            <div className="grid grid-cols-4 gap-5">
                <EquipmentChanges equipmentsAmount={data?.length ?? 0} />
                <EquipmentActive />
                <ExpiredEquipment />
            </div>
        </section>
    )
}

export default ServicePage