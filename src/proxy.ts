import { createServerClient } from "@supabase/ssr/dist/main/createServerClient";
import { NextRequest, NextResponse } from "next/server"
import { isUserAdmin, isUserEmployee } from "./utils/access";

export const proxy = async (request: NextRequest) => {
    const supabaseResponse = NextResponse.next({ request })
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({name, value}) => request.cookies.set(name, value))
                    cookiesToSet.forEach(({name, value, options}) => supabaseResponse.cookies.set(name, value, options))
                }
            }
        }
    )

    const isAdmin = await isUserAdmin(supabase)
    const isEmployee = await isUserEmployee(supabase)

    const adminProtectedRoutes = [
        /^\/equipment\/create$/,
        /^\/account\/admin$/,
    ]

    const employeeProtectedRoutes = [
        /^\/equipment(?:\/.*)?$/,
        /^\/service(?:\/.*)?$/,
    ]

    const protectedRoutes = [
        /^\/auth(\/.*)?$/
    ]

    const pathname = request.nextUrl.pathname
    const { data: {user} } = await supabase.auth.getUser()

    const isAdminRoute = adminProtectedRoutes.some(r => r.test(pathname))
    const isEmployeeRoute = employeeProtectedRoutes.some(r => r.test(pathname))

    if (isAdminRoute && !isAdmin) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    if (isEmployeeRoute && !isEmployee && !isAdmin) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    if (user && protectedRoutes.some(routes => routes.test(pathname))) {
        const newUrl = request.nextUrl.clone()
        newUrl.pathname = "/"

        return NextResponse.redirect(newUrl)
    }

    return supabaseResponse
}