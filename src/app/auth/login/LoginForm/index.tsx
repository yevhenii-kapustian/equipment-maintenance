'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LogIn } from "@/actions/log-in"
import { logInSchema } from "@/actions/schemas"
import { useMutation } from "@tanstack/react-query"
import ErrorMessage from "@/components/ErrorMessage"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

const LoginForm = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const {
            register,
            handleSubmit,
            formState: {errors}
        } = useForm({resolver: zodResolver(logInSchema)})

        const { mutate, data, isPending } = useMutation({
            mutationFn: LogIn
        })

        const toggleCheckPassword = () => {
            setIsVisible(!isVisible)
        }

    return(
        <>
        <form onSubmit={handleSubmit(values => mutate(values))}>
            <div className="mb-5 flex flex-col items-center">
                <h2 className="font-bold text-2xl">Ласкаво Просимо</h2>
                <p className="mt-2">Увійдіть до свого облікового запису</p>
            </div>
            <fieldset className="flex flex-col">
                <label htmlFor="email">Електронна пошта</label>
                <input placeholder="m@example.com" type="text" className="py-2 px-4 rounded-xl border border-[#e0e0e0]" {...register("email")} id="email"/>
                {errors.email && <ErrorMessage message={errors.email.message!}/>}
            </fieldset>

            <fieldset className="mt-5 flex flex-col">
                <label htmlFor="password">Пароль</label>
                <div className="relative flex items-center">
                    <input placeholder="∙∙∙∙∙" type={isVisible ? "text" : "password"} className="w-full py-2 px-4 rounded-xl border border-[#e0e0e0]" {...register("password")} id="password"/>
                    <div onClick={toggleCheckPassword} className="absolute right-4 cursor-pointer">
                        {isVisible ? <Eye /> : <EyeOff />}
                    </div>
                </div>
                {errors.password && <ErrorMessage message={errors.password.message!}/>}
            </fieldset>

            <button className="mt-5 p-2 w-full gray-btn animation-btn cursor-pointer rounded-xl">Вхід</button>

            <p className="mt-2 text-sm text-center">Немає облікового запису? <Link className="underline" href="/auth/signup">Зареєструватися</Link></p>
        </form>

        {data?.error && <div> <ErrorMessage message={data.error}/> </div> }
        </>
    )
}

export default LoginForm