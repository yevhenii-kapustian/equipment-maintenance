import EditEquipmentTitle from "./EditEquipmentTitle"
import { EquipmentListType } from "@/utils/supabase/queries"

type TitleEquipmentProps = {
    name: string,
    category: string,
    equipmentId: string,
    getEquipments: EquipmentListType,
    isAdmin: boolean
}

const TitleEquipment = ({name, category, equipmentId, getEquipments, isAdmin}: TitleEquipmentProps) => {
    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">{name}</h1>
                {isAdmin && <EditEquipmentTitle getEquipments={getEquipments} equipmentId={equipmentId} /> }
            </div>
            <p className="font-semibold">Тип: <span className="font-normal capitalize">{category}</span></p>
        </div>
    )
}

export default TitleEquipment