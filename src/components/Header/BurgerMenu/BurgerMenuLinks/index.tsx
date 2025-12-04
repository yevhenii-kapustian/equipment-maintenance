"use client"

import { User } from "@supabase/supabase-js"

type BurgerMenuLinksProps = {
    user: User | null
    closeMenu: () => void
}

export const BurgerMenuLinks = ({ user, closeMenu }: BurgerMenuLinksProps) => (
    <>
        <li className="pt-5 border-t border-[#e0e0e0]">
            <a className="block w-full" href="/" onClick={closeMenu}>Головна</a>
        </li>
        <li className="pt-5 border-t border-[#e0e0e0]">
            <a className="block w-full" href="/equipment" onClick={closeMenu}>Обладнання</a>
        </li>
        <li className="pt-5 border-t border-[#e0e0e0]">
            <a className="block w-full" href="/service" onClick={closeMenu}>Обслуговування</a>
        </li>
        <li className="pt-5 border-t border-[#e0e0e0]">
            <a className="block w-full" href="/team" onClick={closeMenu}>Команда</a>
        </li>

        {user ? (
            <li className="pt-10 border-t border-[#e0e0e0]">
                <a className="block w-full" href="/account" onClick={closeMenu}>Мій акаунт</a>
            </li>
        ) : (
            <li className="mt-10">
                <a href="/auth/login" className="block w-40 text-center py-4 px-7 gray-btn animation-btn">
                    Увійти
                </a>
            </li>
        )}

        <li>
            <a href="/contact" className="block w-40 text-center py-4 px-7 green-btn animation-btn">
                Зв'язатися
            </a>
        </li>
    </>
)
