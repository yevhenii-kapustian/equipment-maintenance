import LogOutButton from "@/components/LogoOutButton"
import Link from "next/link"
import { isUserAdmin } from "@/utils/access"
import { createClient } from "@/utils/supabase/server-client"

const AccountPage = async () => {
    const supabase = await createClient()
    const isAdmin = await isUserAdmin(supabase)

    return(
        <>
        <LogOutButton />
        {isAdmin && <Link href="/account/admin">Admin</Link>}
        </>        
    )
}

export default AccountPage