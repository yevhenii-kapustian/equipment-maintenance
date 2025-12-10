import { EquipmentListType } from "@/utils/supabase/queries";

const Equipments = ({equipments}: {equipments: EquipmentListType}) => {
    return (
        <>
        {equipments.map((equipment, index) => (
            <div key={index} className="grid grid-cols-3 justify-items-center items-center gap-5 mt-5 py-4 px-20 bg-[#00000011] rounded-3xl capitalize max-sm:px-5">
                <p>{equipment.name}</p>
                <p>{equipment.category}</p>
                <p>{equipment.location}</p>
            </div>
        ))}
        </>
    )
}

export default Equipments