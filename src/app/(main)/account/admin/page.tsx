import { getUsers } from "@/utils/supabase/queries"
import UsersRoleSection from "./UsersRoleSection"

const AdminPage = async () => {
    const { data: authUser } = await getUsers()

    return(
        <>
        {authUser && <UsersRoleSection users={authUser} /> }
        </>
    )
}

export default AdminPage