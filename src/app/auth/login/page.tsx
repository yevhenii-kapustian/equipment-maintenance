import Image from "next/image"
import LoginForm from "./LoginForm"

const LoginPage = () => {
    return(
        <section className="w-full min-h-screen flex justify-center items-center px-4 py-10">
            <div className="max-w-3xl grid grid-cols-2 shadow-2xl rounded-xl overflow-hidden max-sm:grid-cols-1">
                <div className="w-full p-8 max-sm:px-4 max-sm:order-2">
                    <LoginForm />
                </div>
                <div className="min-h-70 not-visited:bg-gray-300 max-sm:order-1">
                    <Image priority className="min-h-full object-cover" src="/nature.jpeg" alt="nature view" width={1000} height={1000}/>
                </div>
            </div>
        </section>
    )
}

export default LoginPage