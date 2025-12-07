'use client'

import Image from "next/image";
import { motion } from "motion/react"

const TrustedBy = () => {
    return(
        <motion.section initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }} 
                        className="mt-10"
        >
            <h3 className="opacity-70">Довіряють:</h3>
            <div className="flex justify-center">
                <Image className="w-50 invert" src="/logoTrusted1.png" alt="logo trusted 1" width={1000} height={1000} />
            </div>
        </motion.section>
    )
}

export default TrustedBy;