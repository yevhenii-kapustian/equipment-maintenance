import { createClient } from "@/utils/supabase/server-client"
import { 
        getSingleEquipment, getEquipmentList,
        EquipmentListType
        } from "@/utils/supabase/queries"
import TitleEquipment from "./TitleEquipment"
import EquipmentDetails from "./EquipmentDetails"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { isUserAdmin } from "@/utils/access"

const SingleEquipment = async ( {params}: {params: { slug: string }} ) => {
    const { slug } = await params

    const supabase = await createClient()

    const { data: {user} } = await supabase.auth.getUser()

    const { data: singlePost, error: postError } = await getSingleEquipment(slug)
    const { data: posts } = await getEquipmentList(supabase)

    if (postError) return <p>Помилка: {postError.message}</p>
    if (!singlePost) return <p>Запис не знайдено</p>

    return(
        <section>
            <Link className="mb-10 flex items-center gap-2" href="/equipment"><span><ArrowLeft size={15} /></span>Назад</Link>
            <TitleEquipment name={singlePost.name as string}
                            category={singlePost.category as string}
                            equipmentId={singlePost.id}
                            getEquipments={posts as EquipmentListType}
                            isAdmin={await isUserAdmin(supabase)} 
            />
            <span className="w-full my-5 block border-t border-[#e0e0e0]" />
            <div className="flex justify-end">
                <EquipmentDetails equipmentId={singlePost.id}
                                    singlePostId={singlePost.id}
                                    slug={slug} />
            </div>

        </section>
    )
}

export default SingleEquipment