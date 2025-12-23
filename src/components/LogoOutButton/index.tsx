'use client'

import { LogOut } from "@/actions/log-out"

const LogOutButton = () => {
    const handleClick = () => {
        LogOut()
    }

    return(
        <button onClick={handleClick} className="py-2 px-4 font-semibold gray-btn animation-btn cursor-pointer">Вийти</button>
    )
}

export default LogOutButton