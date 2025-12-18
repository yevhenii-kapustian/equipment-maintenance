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
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="pb-3 flex items-center justify-between border-b border-[#e0e0e0]">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Планування
                    </h3>

                    {singleEquipmentDetail?.schedule && (
                        <button onClick={() => setIsOpenEdit(true)}
                                className="flex h-9 w-9 items-center justify-center
                                            rounded-xl border border-gray-200 bg-gray-50
                                            transition hover:bg-gray-100 cursor-pointer"
                        >
                            <Pencil size={14} className="text-gray-600" />
                        </button>
                    )}
                </div>

                {singleEquipmentDetail?.schedule ? (
                    <div className="mt-4 space-y-3 text-sm text-gray-700">
                        <p><span className="font-medium text-gray-900">Дата: </span>
                            {singleEquipmentDetail.schedule}
                        </p>

                        <div className="space-y-2">
                            <p><span className="font-medium text-gray-900">План: </span>
                                {singleEquipmentDetail.plan}
                            </p>

                            <p><span className="font-medium text-gray-900">Факт: </span>
                                {singleEquipmentDetail.fact || '—'}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="mt-4 rounded-xl border-2 border-dashed border-gray-300
                              bg-gray-50 p-4 text-center text-sm text-gray-600"
                    >
                        <p>Планування ще не існує</p>

                        <button onClick={() => setIsOpenCreate(true)}
                                className="w-full mt-3 py-2 black-btn animation-btn cursor-pointer"
                        >
                            Додати план
                        </button>
                    </div>
                    )}
            </div>

            {isOpenCreate && !singleEquipmentDetail?.schedule && (
                <CreateEquipmentDetails setIsOpenCreate={setIsOpenCreate} slug={slug} equipmentId={equipmentId} />
            )}

            {isOpenEdit && (
                <EditEquipmentDetails setIsOpenEdit={setIsOpenEdit} equipmentId={equipmentId} />
            )}
        </div>
    )
}

export default EquipmentDetails