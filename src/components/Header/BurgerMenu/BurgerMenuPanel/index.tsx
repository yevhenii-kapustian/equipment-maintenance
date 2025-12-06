"use client"

type Props = {
    isOpen: boolean
    children: React.ReactNode
}

export const BurgerMenuPanel = ({ isOpen, children }: Props) => (
    <ul
        className={`absolute top-21 left-0 w-full bg-white rounded-b-4xl
            pt-4 pb-10 px-5 flex flex-col gap-4 font-semibold
            transition-all duration-300 ease-out max-h-[80vh] overflow-y-auto
            ${isOpen ? 'translate-y-0 opacity-100 pointer-events-auto'
                     : '-translate-y-6 opacity-0 pointer-events-none'}
        `}
        style={{ boxShadow: "0 10px 15px -5px rgba(0,0,0,0.15)" }}
    >
        {children}
    </ul>
)
