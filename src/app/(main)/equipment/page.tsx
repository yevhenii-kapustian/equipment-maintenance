import { getEquipmentList, getUserRole } from "@/utils/supabase/queries";
import EquipmentSection from "@/app/(main)/equipment/EquipmentSection";
import { createClient } from "@/utils/supabase/server-client";

const EquipmentPage = async () => {
    const supabase = await createClient()
    const { data: equipment } = await getEquipmentList(supabase)
    const { data: { user } } = await supabase.auth.getUser()
    const { data: profile } = await getUserRole(user?.id as string)

    const isAdmin = profile?.role === "admin"

    return (
        <>
        <EquipmentSection isAdmin={isAdmin} equipment={equipment ?? []} />
        </>
    )
}

export default EquipmentPage; 