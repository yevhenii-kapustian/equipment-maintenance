'use client'

import { useState, useEffect } from "react"

const NavLinks = () => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            setIsSticky(window.scrollY > 70);
        };

        checkScroll()

        window.addEventListener("scroll", checkScroll);
        return () => window.removeEventListener("scroll", checkScroll);
    }, []);

    return (
        <>
        {!isSticky && (
            <ul className="flex gap-20 items-center max-xl:gap-10">
                <li><a href="/equipment">Обладнання</a></li>
                <li><a href="/service">Обслуговування</a></li>
                <li><a href="/team">Команда</a></li>
            </ul>
        )}

        <ul className={`
                fixed left-1/2 -translate-x-1/2 top-3
                flex justify-center gap-20
                px-10 py-4 rounded-3xl
                backdrop-blur-sm bg-white/30
                duration-300 ease-out z-50
                ${isSticky ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}
            `}
        >
            <li><a href="/equipment">Обладнання</a></li>
            <li><a href="/service">Обслуговування</a></li>
            <li><a href="/team">Команда</a></li>
        </ul>
        </>
    )
}

export default NavLinks;