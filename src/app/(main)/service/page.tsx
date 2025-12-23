import { createClient } from "@/utils/supabase/server-client"
import { getEquipmentWithDetails } from "@/utils/supabase/queries"
import EquipmentChanges from "./EquipmentChanges"
import EquipmentActive from "./EquipmentActive"
import ExpiredEquipment from "./ExpiredEquipment"
import ServiceDone from "./ServiceDone"
import EquipmentOverview from "./EquipmentOverview"
import NearestService from "./NearestService"

const ServicePage = async () => {
    const supabase = await createClient()
    const { data } = await getEquipmentWithDetails(supabase)

    return (
        <section>
            <h1 className="text-5xl font-semibold max-sm:text-4xl">Обслуговування</h1>

            <div className="mt-10 pt-10 grid grid-cols-4 border-t border-[#e0e0e0] items-stretch gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
                <EquipmentChanges equipmentsAmount={data?.length ?? 0} />
                <EquipmentActive />
                <ExpiredEquipment />
                <ServiceDone />
            </div>
            <div className="flex gap-5 max-xl:flex-col max-xl:gap-0">
                <EquipmentOverview />
                <span className='my-10 w-full h-1 border-t border-[#e0e0e0] hidden max-sm:block' />
                <NearestService />
            </div>
        </section>
    )
}

export default ServicePage