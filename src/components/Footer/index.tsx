import Logo from "../Logo"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return(
        <footer className="py-10 px-40 max-xl:px-5">
             <ul className="flex gap-20 items-center max-xl:gap-10 py-15 border-t border-[#e0e0e0] font-semibold max-sm:flex-col max-sm:items-start">
                <li><a href="/equipment">Обладнання</a></li>
                <li><a href="/service">Обслуговування</a></li>
                <li><a href="/team">Команда</a></li>
            </ul>

            <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-10">
                <div className="flex items-baseline gap-3 max-sm:flex-col max-sm:gap-1">
                    <Logo fontSize={32}/>
                    <p>Copyright © {currentYear}</p>
                </div>

                <p>All Rights Reserved</p>
            </div>
        </footer>
    )
}

export default Footer