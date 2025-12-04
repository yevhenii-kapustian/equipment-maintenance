import { createClient } from "@/utils/supabase/server-client"
import Logo from "../Logo"
import AccountLinks from "./AccountLinks"
import BurgerMenu from "./BurgerMenu"

const Header = async () => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return(
        <header className="px-40 py-5 max-xl:px-5">
            <div className="w-full flex items-center max-lg:justify-between">
                <Logo fontSize={30} />
                <AccountLinks user={user}/>
                <BurgerMenu user={user} />
            </div>
        </header>
    )
}

export default Header