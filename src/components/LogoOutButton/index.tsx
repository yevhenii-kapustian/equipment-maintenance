'use client'

import { LogOut } from "@/actions/log-out"

const LogOutButton = () => {
    const handleClick = () => {
        LogOut()
    }

    return(
        <button onClick={handleClick}>LogOut</button>
    )
}

export default LogOutButton