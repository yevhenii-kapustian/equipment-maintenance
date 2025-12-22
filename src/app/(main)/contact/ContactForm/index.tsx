'use client'

import { useForm, ValidationError } from '@formspree/react';
import { Phone, Mail } from "lucide-react"
import Logo from '@/components/Logo';

const ContactForm = () => {
    const [state, handleSubmit] = useForm("xykgbzno");

    if (state.succeeded) {
        return <p>Thanks for joining!</p>;
    }

    return (
        <div>
            <h1 className='block w-full mb-10 text-5xl text-start font-semibold'>Зв'язатися</h1>
            <span className='mb-10 block w-full h-1 border-t border-[#e0e0e0]' />
            <div className='flex items-center gap-5'>
                <div className='w-[30%] flex flex-col gap-2'>
                    <h2 className='text-3xl font-bold text-(--color-army-green)'>Надіслати повідомлення</h2>
                    <p>Зв'яжіться з нами через форму нижче – ми завжди на зв'язку та готові допомогти вам із будь-якими завданнями.</p>
                </div>

                <form className='w-[70%] p-8 shadow-xl border border-[#00000023] rounded-2xl flex items-center' onSubmit={handleSubmit}>
                    <div className='w-[30%] mr-8 pr-8 flex flex-col items-center gap-5 border-r border-[#e0e0e0]'>
                        <div className='flex flex-col items-center gap-1'>
                            <Phone className='text-(--color-army-green)' size={35}/>
                            <p className='font-semibold'>Телефон</p>
                            <p className='text-sm opacity-70'>{`+380 (66) 814 85 60`}</p>
                        </div>

                        <div className='flex flex-col items-center gap-1'>
                            <Mail className='text-(--color-army-green)' size={35} />
                            <p className='font-semibold'>Електронна пошта</p>
                            <p className='text-sm opacity-70'>{`s.kapustian@gmail.com`}</p>
                        </div>
                    </div>

                    <div className='w-[70%]'>
                        <Logo fontSize={35} />
                        <div className='mt-4'>
                            <input id="name" type="name" name="name" placeholder={`Введіть своє ім'я`} required
                                    className='w-full py-2 px-4 bg-[#485c1117] rounded-xl resize-none border-0 outline-none shadow-none focus:ring-0 focus:outline-none'
                            />
                            <ValidationError prefix="Name" field="name" errors={state.errors} />
                        </div>

                        <div className='mt-4'>
                            <input id="email" type="email" name="email" placeholder='Введіть свою електронну адресу' required
                                    className='w-full py-2 px-4 bg-[#485c1117] rounded-xl resize-none border-0 outline-none shadow-none focus:ring-0 focus:outline-none'
                            />
                            <ValidationError prefix="Email" field="email" errors={state.errors} />
                        </div>
                        
                        <div className='mt-4'>
                            <textarea id="message" name="message" placeholder='Введіть своє повідомлення' required
                                    className='w-full h-30 py-2 px-4 bg-[#485c1117] rounded-xl resize-none border-0 outline-none shadow-none focus:ring-0 focus:outline-none' 
                            />
                            <ValidationError prefix="Message" field="message" errors={state.errors} />
                        </div>
                        
                        <button type="submit" disabled={state.submitting} className='mt-4 py-2 px-4 green-btn animation-btn cursor-pointer'>Надіслати</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default ContactForm