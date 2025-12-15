import { z } from "zod";

export const adminSchema = z.object({
    role: z.string().nullable()
})

export const logInSchema = z.object({
    email: z.string("Введіть свою електронну адресу").trim().email("Недійсна адреса електронної пошти"),
    password: z.string().min(6, "Пароль має містити щонайменше 6 символів")
})

export const signUpSchema = z.object({
    username: z.string("Введіть своє повне ім'я").min(4, "Занадто коротке ім'я").max(45, "Ім'я занадто довге"),
    email: z.string("Введіть свою електронну адресу").trim().email("Недійсна адреса електронної пошти"),
    password: z.string().min(6, "Пароль має містити щонайменше 6 символів")
})

export const editEquipmentTitleSchema = z.object({
    equipmentId: z.string().uuid(),
    name: z.string()
            .min(3, "Назва повинна містити мінімум 3 символи")
            .max(100, "Назва занадто довга"),
    category: z.string().min(1).optional()
})

export const addEquipmentDetailsSchema = z.object({
    equipmentId: z.string().uuid(),
    schedule: z.string().min(1, "Розклад обов'язковий"),
    plan: z.string().min(1, "План обов'язковий"),
    fact: z.string().min(1).optional(),
    slug: z.string()
})

export const editEquipmentDetailsSchema = z.object({
    equipmentId: z.string().uuid(),
    schedule: z.string().min(1, "Розклад обов'язковий"),
    plan: z.string().min(1, "План обов'язковий"),
    fact: z.string().optional(),
})