import { createClient } from "@/utils/supabase/server-client"
import CreateEquipmentForm from "./CreateEquipmentForm"

const CreateEquipmentPage = async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  return (
    <section className="flex justify-center">
      <CreateEquipmentForm userId={user.id} />
    </section>
  )
}

export default CreateEquipmentPage
