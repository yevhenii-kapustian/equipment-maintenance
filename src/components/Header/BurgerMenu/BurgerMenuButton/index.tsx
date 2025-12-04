"use client"

import { Menu, X } from "lucide-react"

type BurgerMenuButtonProps = {
    isOpen: boolean
    onClick: () => void
}

export const BurgerMenuButton = ({ isOpen, onClick }: BurgerMenuButtonProps) => (
    <button className="cursor-pointer p-2" onClick={onClick}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
    </button>
)