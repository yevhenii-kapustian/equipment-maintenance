import { EquipmentListType } from "@/utils/supabase/queries";
import Link from "next/link";

const Equipments = ({equipments}: {equipments: EquipmentListType}) => {
    return (
        <>
        {equipments.map((equipment, index) => (
            <Link href={`/equipment/${equipment.slug}`} key={index} className="grid grid-cols-3 justify-items-center text-center items-center gap-5 mt-5 py-4 px-20 bg-[#00000011] rounded-3xl capitalize max-sm:px-5">
                <p>{equipment.name}</p>
                <p>{equipment.category}</p>
                <p>{equipment.location}</p>
            </Link>
        ))}
        </>
    )
}

export default Equipments