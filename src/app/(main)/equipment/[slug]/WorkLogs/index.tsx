'use client'

import { useState, useEffect } from 'react'
import AddWorkLogs from './AddWorkLogs'
import Image from 'next/image'
import { useSingleEquipmentDetail } from '@/hooks/EquipmentDetails/useSingleEquipmentDetail'
import { GetWorkLogsType } from '@/utils/supabase/queries'

const WorkLogs = ({ equipmentId, workLogs }: { equipmentId: string, workLogs: GetWorkLogsType, authUser: string }) => {
    const { data: singleEquipmentDetail } = useSingleEquipmentDetail(equipmentId)
    const hasWorkLogs = workLogs.length > 0

    const [activeImage, setActiveImage] = useState<string | null>(null)
    
    return (
      <>
        <div className="w-full space-y-6">
            {hasWorkLogs ? (
                <>
                {workLogs.map((item, index) => (
                    <div key={index} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <p className="mb-5 text-xl font-bold capitalize">{item.users?.username}</p>
                    
                        {item.description && (
                            <p className="mb-5 leading-relaxed text-gray-700">
                                {item.description}
                            </p>
                        )}

                        {item.image_urls?.length as number > 0 && (
                            <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-2">
                                {item.image_urls?.map((img, imgIndex) => (
                                    <div key={imgIndex}
                                        className="relative aspect-square cursor-zoom-in overflow-hidden rounded-xl bg-gray-100"
                                        onClick={() => setActiveImage(img)}
                                    >
                                        <Image src={img} alt="Work log image" fill className="object-cover transition-transform hover:scale-105" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                </>
            ) : (
            <>
                {singleEquipmentDetail?.fact ? (
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <AddWorkLogs equipmentId={equipmentId} />
                    </div>
                ) : (
                    <div className="flex min-h-[180px] w-full h-full flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 text-center">
                        <p className="text-sm font-medium text-gray-600">
                            Завершіть роботу щоб додати запис
                        </p>
                    </div>
                )}
            </>
            )}
        </div>

        {activeImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={() => setActiveImage(null)}
            >
                <button onClick={() => setActiveImage(null)}
                        className="absolute right-5 top-5 rounded-full bg-black/60 px-3 py-1 text-sm text-white hover:bg-black/80 cursor-pointer"
                >
                    ✕
                </button>

                <div className="relative h-[90vh] w-[90vw]">
                    <Image src={activeImage} alt="Fullscreen preview" fill className="object-contain" />
                </div>
            </div>
        )}
      </>
    )
}

export default WorkLogs