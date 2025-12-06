import Link from "next/link"

const Logo = ({fontSize}: {fontSize: number}) => {
    return <Link href="/" className=" text-black font-semibold uppercase" style={{fontSize: fontSize}}>Kapustian</Link>
}

export default Logo