import Image from "next/image";

const TrustedBy = () => {
    return(
        <section className="mt-10">
            <h3 className="opacity-70">Довіряють:</h3>
            <div className="flex justify-center">
                <Image className="w-50 invert" src="/logoTrusted1.png" alt="logo trusted 1" width={1000} height={1000} />
            </div>
        </section>
    )
}

export default TrustedBy;