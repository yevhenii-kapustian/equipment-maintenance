'use client'

import { useState } from "react"
import CreateEquipmentDetails from "./CreateEquipmentDetails"
import { useSingleEquipmentDetail } from "@/hooks/EquipmentDetails/useSingleEquipmentDetail"
import { Pencil } from "lucide-react"
import EditEquipmentDetails from "./EditEquipmentDetails"

type EquipmentDetailsProps = {
    singlePostId: string,
    equipmentId: string,
    slug: string
}

const EquipmentDetails = ({singlePostId, equipmentId, slug}: EquipmentDetailsProps) => {
    const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false)
    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false)

    const {data: singleEquipmentDetail} = useSingleEquipmentDetail(singlePostId)

    return(
        <div className="w-[30%]">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">Планування</h3>
                {singleEquipmentDetail?.schedule && (
                    <div className="p-3 bg-white border-[#e0e0e0] border rounded-xl shadow cursor-pointer"
                        onClick={() => setIsOpenEdit(true)}
                    >
                        <Pencil strokeWidth={2} size={12} className="opacity-80" />
                    </div>
                )}
            </div>
            {singleEquipmentDetail?.schedule ? (
                <>
                <p className="mt-3"><span className="font-semibold">Дата:</span> {singleEquipmentDetail.schedule}</p>
                <div className="mt-2">
                    <h4><span className="font-semibold">План:</span> {singleEquipmentDetail.plan}</h4>
                    <h4 className="mt-2"><span className="font-semibold">Факт:</span> {singleEquipmentDetail.fact || "-"}</h4>
                </div>
                </>
            ) : (
                <div className="mt-5 p-3 border border-dashed border-[#919191] text-center rounded-xl">
                    <p>Планування ще не існує</p>
                    <button onClick={() => setIsOpenCreate(true)} className="animation-btn gray-btn mt-3 w-full p-2 cursor-pointer">Додати план</button>
                </div>
            )}
            {isOpenCreate && !singleEquipmentDetail?.schedule && <CreateEquipmentDetails setIsOpenCreate={setIsOpenCreate} slug={slug} equipmentId={equipmentId} />}
            {isOpenEdit && <EditEquipmentDetails setIsOpenEdit={setIsOpenEdit} equipmentId={equipmentId} />}
        </div>
    )
}

export default EquipmentDetails