'use client'

import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { SignUp } from "@/actions/sign-up"
import { signUpSchema } from "@/actions/schemas"
import Link from "next/link"
import Logo from "@/components/Logo"

const SignupForm = () => {
    const {
            register,
            handleSubmit,
            formState: {errors}
        } = useForm({resolver: zodResolver(signUpSchema)})

        const { mutate, isPending, error } = useMutation({
            mutationFn: SignUp
        })

    return(
        <>
        <form onSubmit={handleSubmit(values => mutate(values))}>
            <div className="mb-5 flex flex-col items-center">
                <Logo fontSize={40}/>
                <p className=" text-sm text-center text-[#2f2f2f]">Будь ласка, зареєструйтесь, щоб продовжити</p>
            </div>

            <fieldset className="flex flex-col">
                <label htmlFor="name">Ім'я</label>
                <input placeholder="Введіть своє повне ім'я" type="text" className="py-2 px-4 rounded-xl border border-[#e0e0e0]" {...register("username")} id="username"/>
                {errors.username && <ErrorMessage message={errors.username.message!}/>}
            </fieldset>

            <fieldset className="mt-5 flex flex-col">
                <label htmlFor="email">Електронна пошта</label>
                <input placeholder="m@example.com" type="text" className="py-2 px-4 rounded-xl border border-[#e0e0e0]" {...register("email")} id="email"/>
                {errors.email && <ErrorMessage message={errors.email.message!}/>}
            </fieldset>

            <fieldset className="mt-5 flex flex-col">
                <label htmlFor="password">Пароль</label>
                <input placeholder="*****" type="text" className="py-2 px-4 rounded-xl border border-[#e0e0e0]" {...register("password")} id="password"/>
                {errors.password && <ErrorMessage message={errors.password.message!}/>}
            </fieldset>

            <button className="mt-5 p-2 w-full gray-btn animation-btn cursor-pointer rounded-xl">Зареєструватися</button>

            <p className="mt-2 text-sm text-center">У вас є обліковий запис? <Link className="underline" href="/auth/login">Увійти</Link></p>
        </form>

        {error && <div> <ErrorMessage message={error.message}/> </div> }
        </>
    )
}

export default SignupForm