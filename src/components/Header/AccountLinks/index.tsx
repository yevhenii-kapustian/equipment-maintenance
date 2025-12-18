import { createClient } from "@/utils/supabase/server-client";
import NavLinks from "./NavLinks"
import { User as UserType } from "@supabase/supabase-js"
import { MoveUpRight } from 'lucide-react';
import { isUserAdmin, isUserEmployee } from "@/utils/access";

interface AccountLinksProps {
    user: UserType | null
}

const AccountLinks = async ({user}: AccountLinksProps) => {
    const supabase = await createClient()
    const isAdmin = await isUserAdmin(supabase)
    const isEmployee = await isUserEmployee(supabase)

    return (
        <div className="flex items-center justify-between w-full font-semibold max-lg:hidden">
            <div className="mx-auto">
                <NavLinks isEmployee={isEmployee} isAdmin={isAdmin} />   
            </div>
        
            <ul className="flex items-center gap-3">
                {user ? (
                    <li><a href="/account">Мій акаунт</a></li>
                ) : (
                    <li><a href="/auth/login" className="py-3 px-4 gray-btn animation-btn">Увійти</a></li>
                )}

                <li><a href="/contact" className=" py-3 px-4 flex justify-center items-center gap-1 green-btn animation-btn">Зв'язатися <span><MoveUpRight size={13} strokeWidth={3} /></span> </a></li>
            </ul>
        </div>
    )
}

export default AccountLinks