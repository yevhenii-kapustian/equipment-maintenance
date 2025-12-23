"use client"

import { User } from "@supabase/supabase-js"
import { useState, useEffect } from "react"
import { BurgerMenuButton } from "./BurgerMenuButton"
import { BurgerMenuPanel } from "./BurgerMenuPanel"
import { BurgerMenuLinks } from "./BurgerMenuLinks"

type BurgerMenuProps = {
    user: User | null,
    isAdmin: boolean,
    isEmployee: boolean
}

const BurgerMenu = ({ user, isEmployee, isAdmin }: BurgerMenuProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        const next = !isOpen
        setIsOpen(next)
        document.body.style.overflow = next ? "hidden" : "unset"
    }

    const closeMenu = () => {
        setIsOpen(false)
        document.body.style.overflow = "unset"
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 ) {
                setIsOpen(false)
                document.body.style.overflow = "unset"
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className="lg:hidden flex flex-col z-20">
            <BurgerMenuButton isOpen={isOpen} onClick={toggleMenu} />

            <BurgerMenuPanel isOpen={isOpen}>
                <BurgerMenuLinks isAdmin={isAdmin} isEmployee={isEmployee} user={user} closeMenu={closeMenu} />
            </BurgerMenuPanel>
        </div>
    )
}

export default BurgerMenu
