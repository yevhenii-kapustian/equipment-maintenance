import { createClient } from "@/utils/supabase/server-client"
import { getSingleEquipment } from "@/utils/supabase/queries"

const SingleEquipment = async ( {params}: {params: { slug: string }} ) => {
    const { slug } = await params

    const supabase = await createClient()

    const { data: post, error: postError } = await getSingleEquipment(slug)
    if (postError) return <p>Помилка: {postError.message}</p>
    if (!post) return <p>Запис не знайдено</p>

    return(
        <p>{post?.name}</p>
    )
}

export default SingleEquipment