import { createClient } from "@/utils/supabase/server-client"
import { 
        getSingleEquipment, getEquipmentList,
        EquipmentListType, getWorkLogs
        } from "@/utils/supabase/queries"
import TitleEquipment from "./TitleEquipment"
import EquipmentDetails from "./EquipmentDetails"
import WorkLogs from "./WorkLogs"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { isUserAdmin } from "@/utils/access"

const SingleEquipment = async ( {params}: {params: { slug: string }} ) => {
    const { slug } = await params

    const supabase = await createClient()

    const { data: {user} } = await supabase.auth.getUser()

    const { data: singlePost, error: postError } = await getSingleEquipment(slug)
    const { data: posts } = await getEquipmentList(supabase)
    const { data: workLogs } = await getWorkLogs(singlePost?.id as string)

    if (postError) return <p>Помилка: {postError.message}</p>
    if (!singlePost) return <p>Запис не знайдено</p>

    return(
        <section>
            <Link className="w-fit mb-10 flex items-center gap-2" href="/equipment"><span><ArrowLeft size={15} /></span>Назад</Link>
            <TitleEquipment name={singlePost.name as string}
                            category={singlePost.category as string}
                            location={singlePost.location as string}
                            equipmentId={singlePost.id}
                            getEquipments={posts as EquipmentListType}
                            isAdmin={await isUserAdmin(supabase)} 
            />
            <span className="w-full my-5 block border-t border-[#e0e0e0]" />
            <div className="flex justify-between gap-10 max-lg:flex-col-reverse max-sm:gap-5">
                <WorkLogs workLogs={workLogs || []} equipmentId={singlePost.id} authUser={user?.id as string} />
                <EquipmentDetails equipmentId={singlePost.id}
                                    singlePostId={singlePost.id}
                                    slug={slug} />
            </div>

        </section>
    )
}

export default SingleEquipment