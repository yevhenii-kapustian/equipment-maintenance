import Image from "next/image"
import SignupForm from "./SignupForm"

const SignupPage = () => {
    return(
        <section className="w-full min-h-screen flex justify-center items-center px-4 py-10">
            <div className="max-w-3xl grid grid-cols-2 shadow-2xl rounded-xl overflow-hidden max-sm:grid-cols-1">
                <div className="min-h-70 bg-gray-300">
                    <Image priority className="min-h-full object-cover" src="/natureKarpaty.jpg" alt="nature view" width={1000} height={1000}/>
                </div>
                <div className="w-full p-8 max-sm:px-4">
                    <SignupForm />
                </div>
            </div>
        </section>
    )
}

export default SignupPage