import Link from "next/link"
import { MailCheck } from 'lucide-react';

const ConfirmationPage = () => {
    return(
        <section className="w-full min-h-screen flex flex-col justify-center items-center px-4 py-10">
            <div className="w-80 p-10 shadow-2xl">
                <div className="flex flex-col items-center text-center gap-2">
                    <MailCheck size={40}/>
                    <h1 className="text-3xl font-bold">Перевірте свою електронну пошту</h1>
                    <p>Щоб підтвердити свою особу, незабаром ви отримаєте електронний лист для активації облікового запису.</p>
                </div>
                <div className="">
                    <Link className="mt-5 p-2 text-center block green-btn animation-btn" href="/auth/login">Вхід</Link>
                </div>
            </div>
        </section>
    )
}

export default ConfirmationPage