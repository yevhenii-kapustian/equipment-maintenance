import LogOutButton from "@/components/LogoOutButton"
import Link from "next/link"
import { isUserAdmin } from "@/utils/access"
import { createClient } from "@/utils/supabase/server-client"

const AccountPage = async () => {
    const supabase = await createClient()
    const isAdmin = await isUserAdmin(supabase)

    return(
        <section>
            <div className="flex justify-between items-center">
                <h1 className="text-5xl font-semibold max-sm:text-4xl">Мій профіль</h1>
                <div className="flex gap-3 max-sm:flex-col">
                    <LogOutButton />
                    {isAdmin && <Link href="/account/admin" className="py-2 px-4 font-semibold black-btn animation-btn">Адмін</Link>}       
                </div>
            </div>
            <span className='my-10 block w-full h-1 border-t border-[#e0e0e0]' />

            <p className="text-center">Скоро буде...</p>
        </section>
    )
}

export default AccountPage