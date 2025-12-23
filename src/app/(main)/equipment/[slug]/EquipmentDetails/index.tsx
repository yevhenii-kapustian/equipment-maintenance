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

    const {data: singleEquipmentDetail, isLoading} = useSingleEquipmentDetail(singlePostId)

    if (isLoading) {
        return (
            <div className="w-[30%] max-lg:w-full animate-pulse">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        
                    <div className="pb-3 flex items-center justify-between border-b border-[#e0e0e0]">
                        <div className="h-5 w-32 bg-gray-300 rounded"></div>
                        <div className="h-9 w-9 bg-gray-300 rounded-xl"></div>
                    </div>

                    <div className="mt-4 space-y-3">
                        <div className="h-4 w-40 bg-gray-300 rounded"></div>

                        <div className="space-y-2">
                            <div className="h-4 w-full bg-gray-300 rounded"></div>
                            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="w-[30%] max-lg:w-full">
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