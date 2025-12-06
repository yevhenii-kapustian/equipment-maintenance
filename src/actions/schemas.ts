import { z } from "zod";

export const logInSchema = z.object({
    email: z.string("Введіть свою електронну адресу").trim().email("Недійсна адреса електронної пошти"),
    password: z.string().min(6, "Пароль має містити щонайменше 6 символів")
})

export const signUpSchema = z.object({
    username: z.string("Введіть своє повне ім'я").min(4, "Занадто коротке ім'я").max(45, "Ім'я занадто довге"),
    email: z.string("Введіть свою електронну адресу").trim().email("Недійсна адреса електронної пошти"),
    password: z.string().min(6, "Пароль має містити щонайменше 6 символів")
})