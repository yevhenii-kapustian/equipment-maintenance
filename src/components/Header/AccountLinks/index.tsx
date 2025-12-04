import NavLinks from "./NavLinks"
import { User as UserType } from "@supabase/supabase-js"

interface AccountLinksProps {
    user: UserType | null
}

const AccountLinks = async ({user}: AccountLinksProps) => {
    return (
        <div className="flex items-center justify-between w-full font-semibold max-lg:hidden">
            <div className="mx-auto">
                <NavLinks />   
            </div>
        
            <ul className="flex items-center gap-3">
                {user ? (
                    <li><a href="/account">Мій акаунт</a></li>
                ) : (
                    <li><a href="/auth/login" className="py-4 px-7 gray-btn animation-btn">Увійти</a></li>
                )}

                <li><a href="/contact" className="py-4 px-7 green-btn animation-btn">Зв'язатися</a></li>
            </ul>
        </div>
    )
}

export default AccountLinks