'use client'

import Link from "next/link"
import { motion } from "motion/react"

const ContactUsSection = () => {
    return(
        <motion.section initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }} 
                        className="mt-10 pt-30 pb-20 flex justify-center border-t border-[#e0e0e0]"
        >
            <div className="w-96 flex flex-col gap-5 text-center">
                <h3 className="text-5xl max-sm:text-4xl">Зв'яжіться з нами</h3>
                <p className="opacity-70 max-sm:text-sm">Є питання? Зв'яжіться з нами, залишивши заявку</p>
                <Link href="/contact" className="p-2 green-btn animation-btn text-center">Зв'язатися</Link>
            </div>
        </motion.section>
    )
}

export default ContactUsSection